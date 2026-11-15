---
type: Spec
title: Atividade III — sub-redes privadas para o RDS e HTTPS condicional no ALB
description: Segmentar o banco em sub-redes privadas e preparar o ALB para HTTPS sem exigir domínio no deploy atual.
status: stable
tags: [aws, cloudformation, atividade-iii, rede, https]
generated:
  by: human:helena-duarte
  at: 2026-11-13T00:00:00Z
sources:
  - id: template
    resource: atividade-iii-cloudformation/template.yaml
    title: Template CloudFormation da Atividade III
  - id: readme
    resource: atividade-iii-cloudformation/README.md
    title: Documentação da Atividade III
---

# Contexto

A revisão técnica apontou duas dívidas na Atividade III:

1. O RDS não é público, mas o `DatabaseSubnetGroup` usa as sub-redes públicas.
2. O ALB só expõe HTTP na porta 80.

A conta não possui domínio nem hosted zone. HTTPS real no ALB exige certificado
ACM na região `us-east-2` e domínio válido; sem domínio, o caminho é deixar o
template preparado para receber um certificado e um domínio no futuro.

# Requisitos

- **R1** — Criar duas sub-redes privadas em AZs distintas, sem rota para o
  Internet Gateway.
- **R2** — O RDS deve usar somente as sub-redes privadas; `PubliclyAccessible`
  continua `false`.
- **R3** — Não criar NAT Gateway. O RDS não precisa de saída para a internet; a
  EC2 continua na sub-rede pública para `dnf` e SSM.
- **R4** — Adicionar listener HTTPS 443 condicional, ativado apenas quando
  `CertificateArn` e `DomainName` forem informados.
- **R5** — Sem certificado/domínio, o comportamento atual (HTTP:80) permanece.
- **R6** — Com HTTPS ativo, o listener HTTP:80 redireciona para HTTPS:443 e o
  Security Group do ALB libera 443.
- **R7** — Nenhuma chamada à AWS ou ao GitHub nesta etapa; alterações apenas
  locais na branch atual.

# Abordagem

- Sub-redes privadas `10.0.2.0/24` e `10.0.3.0/24`, nas AZs 0 e 1.
- `PrivateRouteTable` apenas com a rota local da VPC.
- `DatabaseSubnetGroupPrivate` com as duas sub-redes privadas; `Database`
  passa a referenciar esse grupo. O grupo público antigo é removido.
- HTTPS condicional por parâmetros `CertificateArn` e `DomainName`; nenhum
  certificado ACM é criado pelo template.
- `WebsiteUrl` muda para `https://<DomainName>` quando HTTPS estiver ativo.

# Aceitação

- `DatabaseSubnetGroupPrivate` referencia apenas `PrivateSubnet1` e
  `PrivateSubnet2`.
- `PrivateRouteTable` não possui rota `0.0.0.0/0`.
- Nenhum `NatGateway` é criado.
- Sem `CertificateArn`/`DomainName`, não existe listener 443 e o listener 80
  continua encaminhando para o target group.
- Com ambos os parâmetros, existe listener 443, o listener 80 redireciona com
  `HTTP_301` e o Security Group do ALB libera 443.
- `cfn-lint atividade-iii-cloudformation/template.yaml` termina com exit 0.

# Riscos e rollback

- Alterar o grupo de sub-redes do RDS pode substituir a `DBInstance` no
  CloudFormation. Em `dev`, sem dados, é aceitável; com dados, snapshot manual
  antes e janela de manutenção.
- Certificado ACM com validação DNS pode deixar a pilha pendente se o DNS não
  estiver pronto. O template recebe o ARN pronto; a criação do certificado fica
  fora do stack.
- Rollback: reverter o commit da mudança; se a stack já tiver sido atualizada,
  usar rollback do CloudFormation e restaurar o snapshot do RDS quando houver
  dados.

# Fora de escopo

- NAT Gateway, VPC endpoints, EC2 privada.
- Registro de domínio, hosted zone, criação de certificado ACM.
- CloudFront na frente do ALB.
- WAF, Auto Scaling, Multi-AZ além do que já existe.
- Alterações no pipeline da Atividade IV.
