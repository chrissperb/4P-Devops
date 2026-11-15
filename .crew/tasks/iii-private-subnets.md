---
type: task
id: iii-private-subnets
title: Mover o RDS da Atividade III para sub-redes privadas
status: ready
owner: devops-andre
priority: P1
depends_on: []
goal: O RDS da Atividade III usa somente sub-redes privadas em duas AZs, sem NAT Gateway.
context: |
  Revisão técnica da Atividade III. O `DatabaseSubnetGroup` atual aponta para
  `PublicSubnet1`/`PublicSubnet2`. `PubliclyAccessible: false` evita IP público,
  mas não dá segmentação de rede. Spec:
  `docs/specs/atividade-iii-rede-https.md`.
inputs:
  - atividade-iii-cloudformation/template.yaml
  - docs/specs/atividade-iii-rede-https.md
scope_in:
  - Criar `PrivateSubnet1` em 10.0.2.0/24 na AZ 0 e `PrivateSubnet2` em 10.0.3.0/24 na AZ 1.
  - Criar `PrivateRouteTable` com VpcId e sem nenhuma rota 0.0.0.0/0.
  - Criar as duas associações das sub-redes privadas à route table privada.
  - Criar `DatabaseSubnetGroupPrivate` com as duas sub-redes privadas.
  - Fazer `Database` usar `DatabaseSubnetGroupPrivate`; remover o grupo público antigo.
  - Atualizar comentários do template que descrevem o RDS como estando em sub-rede pública.
  - Atualizar a descrição do template e o diagrama textual de rede, se existirem no arquivo.
scope_out:
  - NAT Gateway, VPC endpoints, privatizar a EC2.
  - Criar ou alterar recursos na AWS.
  - Alterar ALB, EC2, Security Groups, RDS sizing, Multi-AZ ou pipeline.
  - Alterar `atividade-iv-cicd/`.
  - Push, PR, commit na AWS ou GitHub.
acceptance:
  - `PrivateSubnet1` e `PrivateSubnet2` existem em AZs distintas, com `MapPublicIpOnLaunch: false` ou omitido.
  - `PrivateRouteTable` não tem recurso `AWS::EC2::Route` com destino 0.0.0.0/0.
  - `DatabaseSubnetGroupPrivate.SubnetIds` contém somente as duas sub-redes privadas.
  - `Database.DBSubnetGroupName` referencia `DatabaseSubnetGroupPrivate`.
  - Não existe mais `DatabaseSubnetGroup` apontando para `PublicSubnet1`/`PublicSubnet2`.
  - `cfn-lint atividade-iii-cloudformation/template.yaml` exit 0.
  - `git diff --check` exit 0.
verification:
  - cfn-lint atividade-iii-cloudformation/template.yaml
  - git diff --check
  - git diff -- atividade-iii-cloudformation/template.yaml
  - Quando autorizado: criar change set da stack `devops-iii-dev` e revisar `Replacement` do RDS antes de qualquer apply.
constraints:
  - Editar somente o template da Atividade III.
  - Manter estilo e comentários em português.
  - Não rodar comandos que criem, alterem ou excluam recursos na AWS.
  - Não inserir credenciais, ARNs de conta ou dados sensíveis.
  - Não fazer refatoração ampla; menor diff possível.
rollback:
  - Reverter o commit da tarefa; se a stack já tiver sido atualizada, usar rollback do CloudFormation e restaurar snapshot do RDS quando houver dados.
---

# Notas de execução

O template atual usa `PublicSubnet1`/`PublicSubnet2` no `DatabaseSubnetGroup`
(`atividade-iii-cloudformation/template.yaml:519-525`). A rota pública está em
`:196-214`. O RDS tem `PubliclyAccessible: false` em `:572`.

O caminho esperado é criar um grupo novo com nome lógico novo
(`DatabaseSubnetGroupPrivate`) e apontar a `DBInstance` para ele. No
CloudFormation, `DBSubnetGroupName` da `DBInstance` é `Replacement`; o change
set deve mostrar substituição do banco. Não esconder isso no receipt.
