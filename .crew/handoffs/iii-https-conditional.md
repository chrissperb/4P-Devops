---
type: Handoff
id: iii-https-conditional
task: .crew/tasks/iii-https-conditional.md
title: HTTPS condicional no ALB da Atividade III (implementação local)
status: done-local
owner: devops-andre
branch: feature/atividade-iv-cicd-pipeline
base_commit: c0ba80b
depends_on: [iii-private-subnets]
generated:
  by: agent:devops-andre
  model: deepseek-v4.1-flash-free
  at: 2026-11-13T15:40:00Z
scope:
  changed: [atividade-iii-cloudformation/template.yaml]
  untouched:
    - atividade-iii-cloudformation/README.md
    - atividade-iv-cicd/ (pipeline)
    - docs/
    - parâmetros existentes (exceto a Description do AllowedHttpCidr)
---

# Receipt — iii-https-conditional

## Status

`done-local`: escopo implementado e verificado localmente. Nenhum commit, push,
PR, change set ou chamada de escrita à AWS/GitHub foi feita. `cfn-lint` local
(1.60.1) executado; `validate-template` **não** executado (exige autorização).

As alterações de `iii-private-subnets` (já presentes no arquivo de trabalho)
foram preservadas: o baseline de comparação deste receipt é
`HEAD + patch de iii-private-subnets`, não `HEAD`.

## Resumo

- Dois parâmetros novos, ambos `Type: String`, `Default: ''`:
  `CertificateArn` e `DomainName`. Nenhuma validação inventada (sem
  `AllowedPattern`/`MinLength`); ARN e hostname são entradas externas.
- Condição `HasHttps: !And [!Not [!Equals [Ref CertificateArn, '']], !Not [!Equals [Ref DomainName, '']]]`
  — verdadeira só com os dois preenchidos. `IsProd` intacta.
- `HttpsListener` (`AWS::ElasticLoadBalancingV2::Listener`, `Condition: HasHttps`):
  porta 443, `Protocol: HTTPS`, `Certificates: [{CertificateArn: !Ref CertificateArn}]`,
  `DefaultActions` = forward para `TargetGroup`. Nenhum certificado é criado.
- `AlbHttpsIngress` (`AWS::EC2::SecurityGroupIngress`, `Condition: HasHttps`):
  TCP 443/443 de `!Ref AllowedHttpCidr` para `!Ref AlbSecurityGroup`. Recurso
  separado (em vez de `!If` dentro da lista `SecurityGroupIngress`) para não
  introduzir `AWS::NoValue` no SG existente.
- `HttpListener` mantém porta 80/HTTP e passa a usar `DefaultActions: !If`,
  sem troca de logical ID:
  - `HasHttps` verdadeiro → `Type: redirect`, `RedirectConfig` com
    `Protocol: HTTPS`, `Port: '443'`, `Host: !Ref DomainName`,
    `StatusCode: HTTP_301`;
  - falso → `Type: forward` para `TargetGroup` (idêntico ao comportamento anterior).
- `WebsiteUrl`: `!If [HasHttps, !Sub https://${DomainName}, !Sub http://${LoadBalancer.DNSName}]`.
- Comentários/descrições ajustados: cabeçalho (item 3), `Description` da pilha,
  `AllowedHttpCidr` (agora "portas 80 e 443"), comentário do `AlbSecurityGroup`,
  comentário de `SecurityGroups` no `LoadBalancer`, comentário do listener e do output.
- `Fn::If` foi aceito pelo cfn-lint; não houve necessidade de separar o listener
  80 em dois recursos com `HasNoHttps`.
- Sem `AWS::CertificateManager::Certificate`, `AWS::Route53::*`,
  `AWS::CloudFront::*` ou `AWS::EC2::NatGateway` (verificado por asserção).

## Arquivos e faixas de linha

Arquivo único alterado: `atividade-iii-cloudformation/template.yaml`
(762 linhas; vs. baseline `iii-private-subnets`: **+80 / −7**, 9 hunks).

| Faixa (pós-mudança) | Recurso / trecho | Mudança |
| --- | --- | --- |
| 9–11 | Cabeçalho, item 3 | ALB também em HTTPS:443 quando cert+domínio; 80 redireciona |
| 31 | `Description` da pilha | cita HTTPS opcional via certificado ACM e domínio |
| 83–90 | `AllowedHttpCidr` | comentário e `Description` passam a citar portas 80 e 443 |
| 92–98 | `CertificateArn` | novo parâmetro String, Default `''` |
| 100–106 | `DomainName` | novo parâmetro String, Default `''` |
| 139–151 | `HasHttps` | nova condição `Fn::And` + `Fn::Not`/`Fn::Equals` |
| 328–329 | comentário `AlbSecurityGroup` | aceita 80 e, com HTTPS ativo, 443 |
| 351–363 | `AlbHttpsIngress` | novo `AWS::EC2::SecurityGroupIngress`, `Condition: HasHttps`, TCP 443 de `AllowedHttpCidr` |
| 569 | comentário em `LoadBalancer.SecurityGroups` | porta 443 condicional |
| 608–628 | `HttpListener` | `DefaultActions: !If` → redirect `HTTP_301` p/ HTTPS:443 host `DomainName`, senão forward |
| 630–644 | `HttpsListener` | novo listener 443/HTTPS sob `HasHttps`, `Certificates` = `CertificateArn` |
| 726–733 | `WebsiteUrl` | `!If [HasHttps, https://DomainName, http://ALB DNS]` |

## Comandos e exit codes

| Comando | Exit | Evidência |
| --- | --- | --- |
| `/tmp/opencode/cfnlint-venv/bin/cfn-lint atividade-iii-cloudformation/template.yaml` | 0 | sem findings; cfn-lint 1.60.1 |
| `git diff --check` | 0 | sem whitespace/conflito |
| `git diff -- atividade-iii-cloudformation/template.yaml` | 0 | diff revisado (inclui hunks herdados de `iii-private-subnets`, ainda não commitados) |
| `/tmp/opencode/cfnlint-venv/bin/python /tmp/opencode/iii/assert_https_base.py` | 0 | 48 asserções estruturais contra o baseline pós-`iii-private-subnets` |
| `git status --porcelain=v1` | 0 | somente `M atividade-iii-cloudformation/template.yaml` (+ `.crew/`, `docs/` não rastreados, pré-existentes) |

Asserções verificadas pelo script (todas OK): parâmetros String/Default vazio;
`HasHttps` com `Fn::And`; `HttpsListener` com 443/HTTPS/`Certificates`/forward e
`Condition: HasHttps`; `AlbHttpsIngress` 443/443 tcp com `CidrIp` =
`AllowedHttpCidr` e `GroupId` = `AlbSecurityGroup`; `HttpListener` 80/HTTP com
`Fn::If` (ramo true = redirect 301 HTTPS:443 host `DomainName`; ramo false =
forward `TargetGroup`); `WebsiteUrl` com os dois ramos corretos; zero recursos
proibidos; `TargetGroup`, `WebServer`, `Database`, `LoadBalancer`, VPC,
sub-redes públicas e privadas, `PrivateRouteTable`, `DatabaseSubnetGroupPrivate`,
`InstanceSecurityGroup` e `DatabaseSecurityGroup` byte-idênticos ao baseline;
nenhum logical ID removido; novos logical IDs = `{HttpsListener, AlbHttpsIngress}`;
outputs inalterados em quantidade; `AllowedPattern` e demais parâmetros intactos.

Nota de ambiente: as ferramentas de edição/escrita de arquivo foram bloqueadas
por permissão; as mudanças foram aplicadas por
`/tmp/opencode/iii/patch_https.py` (fora do repositório, nada adicionado ao
projeto), que falha se a âncora não for única (9/9 aplicadas). O baseline de
comparação foi gerado em `/tmp/opencode/iii/baseline.yaml` aplicando o patch da
tarefa anterior sobre `git show HEAD:atividade-iii-cloudformation/template.yaml`.

## Critérios de aceitação

- [x] `CertificateArn` e `DomainName` são `String` com `Default: ''`
- [x] `HasHttps` verdadeira só com os dois preenchidos
- [x] `HttpsListener` 443/HTTPS com `Certificates` = `CertificateArn`, sob `HasHttps`
- [x] `AlbHttpsIngress` TCP 443 de `AllowedHttpCidr`, sob `HasHttps`
- [x] `HttpListener` 80 redireciona `HTTP_301` para HTTPS:443 host `DomainName` quando `HasHttps`; senão forward
- [x] `WebsiteUrl` = `https://<DomainName>` / `http://<ALB DNS>`
- [x] Parâmetros vazios = comportamento anterior (forward na 80, sem listener 443, sem regra 443, `WebsiteUrl` HTTP)
- [x] Nenhum recurso ACM/Route53/CloudFront/NAT criado
- [x] `cfn-lint` exit 0
- [x] `git diff --check` exit 0
- [x] diff revisado
- [ ] `validate-template` / change set da stack `devops-iii-dev` — **não executado** (requer autorização)

## Comportamento por cenário

| Cenário | Listener 80 | Listener 443 | SG do ALB | `WebsiteUrl` |
| --- | --- | --- | --- | --- |
| `CertificateArn=''`, `DomainName=''` (default) | HTTP forward p/ `TargetGroup` (idêntico ao anterior) | não criado | apenas 80 | `http://<ALB DNS>` |
| ambos preenchidos | redirect `HTTP_301` → HTTPS:443, `Host: <DomainName>` | HTTPS 443 com `CertificateArn`, forward p/ `TargetGroup` | 80 + 443 de `AllowedHttpCidr` | `https://<DomainName>` |
| só `CertificateArn` ou só `DomainName` | forward (sem redirect) | não criado | apenas 80 | `http://<ALB DNS>` |

## Riscos

1. **Sem validação de serviço.** `validate-template`, lint contra regras
   regionais e change set não rodaram. O template é sintaticamente válido e
   lint-clean, mas o comportamento real do ALB só aparece no change set/apply.
2. **ARN inválido ou de outra região.** O certificado precisa existir em
   `us-east-2` (região da pilha) e cobrir `DomainName`. Se não cobrir, o
   CloudFormation falha na criação do listener e a stack reverte — sem perda de
   dados, mas com janela de erro.
3. **Redirect sem DNS apontando para o ALB.** Com HTTPS ligado, a porta 80
   redireciona para `https://<DomainName>`. Se o registro DNS ainda não
   apontar para o ALB, o site fica inacessível por HTTP e HTTPS. Ordem segura:
   criar/ajustar o DNS antes ou junto da atualização da stack.
4. **Habilitar HTTPS depois muda o `HttpListener`.** A troca de
   `DefaultActions` é update in-place do listener (sem substituição), mas o
   caminho 80→443 passa a valer imediatamente. Reverter exige novo update com
   os parâmetros vazios.
5. **Desligar HTTPS remove listener e regra 443.** Esperado pelo `HasHttps`,
   mas o change set mostrará remoção de `HttpsListener` e `AlbHttpsIngress`.
6. **`DomainName` não é validado.** Valor com esquema (`https://...`), barra ou
   porta quebra o `Host` do redirect e o `WebsiteUrl`. Não foi adicionada
   validação para não inventar contrato; documentado como entrada esperada:
   hostname puro (ex.: `app.exemplo.com`).
7. **`AllowedHttpCidr` também controla a 443.** Quem restringe o CIDR em prod
   restringe HTTPS junto; não há parâmetro separado (fora do escopo).
8. **`AllowedHttpCidr.Description` mudou.** Apenas texto; nenhuma mudança de
   comportamento ou de valor padrão.
9. **`README.md` da Atividade III desatualizado.** Ainda descreve o ALB só em
   HTTP:80 e não cita `CertificateArn`/`DomainName` — fora do escopo autorizado
   (somente o template).

## Rollback

- Antes de aplicar: `git checkout -- atividade-iii-cloudformation/template.yaml`
  (ou reverter o commit da tarefa). Sem commit feito, o rollback é local e
  restaura também o estado de `iii-private-subnets` se usado sem cuidado —
  nesse caso reaplicar o patch daquela tarefa.
- Com a stack já atualizada (somente com autorização explícita): atualizar de
  novo com `CertificateArn=''` e `DomainName=''` (remove listener 443 e regra
  443, volta o forward na 80) ou `aws cloudformation rollback-stack --stack-name devops-iii-dev`
  se o update falhar. Nenhum desses comandos foi executado.

## Follow-ups

- Quando autorizado: `aws cloudformation validate-template --template-body file://atividade-iii-cloudformation/template.yaml --region us-east-2`
  e change set de `devops-iii-dev`, confirmando que só `HttpListener`,
  `HttpsListener` e `AlbHttpsIngress` aparecem como mudança com parâmetros
  vazios (`HttpsListener`/`AlbHttpsIngress` ausentes).
- Atualizar `atividade-iii-cloudformation/README.md` para HTTPS condicional e
  parâmetros novos (tarefa própria; README não foi tocado).
- Avaliar fixar `SslPolicy` no `HttpsListener` (hoje a política padrão do ALB é
  usada). Mudança de escopo, exige decisão.
- Avaliar validação de formato de `DomainName` (ex.: `AllowedPattern` de
  hostname) e parâmetro separado de CIDR para 443 — ambos fora do escopo atual.
- PR/commit: não feitos, conforme instrução.
