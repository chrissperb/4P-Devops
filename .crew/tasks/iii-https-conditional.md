---
type: task
id: iii-https-conditional
title: Preparar HTTPS condicional no ALB da Atividade III
status: ready
owner: devops-andre
priority: P1
depends_on: [iii-private-subnets]
goal: O ALB aceita HTTPS 443 quando CertificateArn e DomainName são fornecidos, mantendo HTTP:80 quando não são.
context: |
  A conta não tem domínio nem hosted zone. HTTPS real no ALB exige certificado
  ACM em us-east-2 e domínio válido. O template deve ficar pronto para receber
  ambos sem quebrar o deploy atual. Spec:
  `docs/specs/atividade-iii-rede-https.md`.
inputs:
  - atividade-iii-cloudformation/template.yaml
  - docs/specs/atividade-iii-rede-https.md
scope_in:
  - Adicionar parâmetros `CertificateArn` e `DomainName`, ambos String com Default vazio.
  - Adicionar condição `HasHttps` verdadeira apenas quando os dois parâmetros forem não vazios.
  - Adicionar `HttpsListener` na porta 443, protocolo HTTPS, com `Certificates` usando `CertificateArn`, sob a condição `HasHttps`.
  - Adicionar `AlbHttpsIngress` liberando TCP 443 a partir de `AllowedHttpCidr`, sob a condição `HasHttps`.
  - Alterar `HttpListener` para redirecionar HTTP:80 para HTTPS:443 com `HTTP_301` e `Host: DomainName` quando `HasHttps`; caso contrário, manter forward para o TargetGroup.
  - Alterar `WebsiteUrl` para `https://<DomainName>` quando `HasHttps`; caso contrário, `http://<ALB DNS>`.
  - Atualizar comentários e descrições dos parâmetros afetados.
scope_out:
  - Criar certificado ACM, hosted zone, registro DNS ou domínio.
  - CloudFront na frente do ALB.
  - Alterar target group, EC2, RDS ou sub-redes.
  - Criar ou alterar recursos na AWS.
  - Alterar `atividade-iv-cicd/`.
  - Push, PR, commit na AWS ou GitHub.
acceptance:
  - Com `CertificateArn` e `DomainName` vazios, não há listener 443 e o listener 80 continua com forward para o target group.
  - Com os dois parâmetros preenchidos, existe listener 443 com o certificado informado, o listener 80 redireciona para HTTPS:443 no host informado e o Security Group do ALB aceita 443.
  - `WebsiteUrl` é `https://<DomainName>` quando `HasHttps` e `http://<ALB DNS>` caso contrário.
  - Nenhum recurso `AWS::CertificateManager::Certificate`, `AWS::Route53::*` ou `AWS::CloudFront::*` é criado.
  - `cfn-lint atividade-iii-cloudformation/template.yaml` exit 0.
  - `git diff --check` exit 0.
verification:
  - cfn-lint atividade-iii-cloudformation/template.yaml
  - git diff --check
  - git diff -- atividade-iii-cloudformation/template.yaml
  - Quando autorizado: `aws cloudformation validate-template --template-body file://atividade-iii-cloudformation/template.yaml --region us-east-2`
constraints:
  - Editar somente o template da Atividade III.
  - Manter o comportamento atual quando os parâmetros estiverem vazios.
  - Não usar `Fn::If` de forma que o cfn-lint ou o CloudFormation rejeitem; validar com cfn-lint.
  - Não inserir certificado, chave, domínio real ou dados sensíveis.
  - Menor diff possível.
rollback:
  - Reverter o commit da tarefa; com parâmetros vazios o template volta ao comportamento HTTP anterior.
---

# Notas de execução

O listener atual é `HttpListener` em `atividade-iii-cloudformation/template.yaml:503-512`.
O Security Group do ALB libera apenas 80 em `:236-248`. O output `WebsiteUrl`
está em `:593`.

`CertificateArn` e `DomainName` são entradas externas; não criar certificado no
stack. O certificado deve existir no ACM de `us-east-2` e o domínio deve apontar
para o ALB. Sem os dois, `HasHttps` fica falso e o deploy atual não muda.
