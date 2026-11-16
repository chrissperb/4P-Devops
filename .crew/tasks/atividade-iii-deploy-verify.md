---
type: task
status: done
owner: devops-andre
priority: P0
depends_on: []
id: atividade-iii-deploy-verify
---

# atividade-iii-deploy-verify — Verificar pré-condições do deploy da Atividade III

> Aceite da Marina: a premissa “stack ausente” ficou obsoleta. O deploy já foi
> reexecutado e `devops-iii-dev` está `CREATE_COMPLETE`; receipt registra a
> divergência e as evidências.

## Goal
Verificar, sem mutar AWS nem GitHub, se o próximo deploy da stack `devops-iii-dev` está desbloqueado e devolver um receipt com evidências.

## Context
- A Atividade IV já publica a SPA em `https://d3k82v3nqyy7lx.cloudfront.net/`.
- A stack `devops-iii-dev` falhou em rollback por permissões IAM; a stack foi apagada com autorização do usuário.
- A policy `gha-4p-devops-deploy-policy` foi atualizada para a versão default `v7`.
- O último erro de IAM corrigido foi `kms:DescribeKey` para `aws/secretsmanager`, exigido por `ManageMasterUserPassword: true`.
- O usuário precisa reexecutar o workflow; o agente não tem credencial para disparar GitHub Actions.

## Inputs
- Repositório: `/home/christian-sperb/Documents/projects/unyleya/4P-Devops`
- Workflow: `.github/workflows/deploy.yml`
- Script de change set: `atividade-iv-cicd/scripts/cfn-change-set.sh`
- Template III: `atividade-iii-cloudformation/template.yaml`
- Template SPA: `atividade-iv-cicd/cloudformation/spa-hosting.yaml`
- Policy local: `atividade-iv-cicd/iam/deploy-role-policy.json`
- Conta AWS: `686420703845`; região `us-east-2`; perfil local `chrissperb`
- Policy ARN: `arn:aws:iam::686420703845:policy/gha-4p-devops-deploy-policy`
- Stacks: `devops-iii-dev` (deve estar ausente), `devops-iv-spa` (deve estar `CREATE_COMPLETE`)

## Scope in
- Inspecionar o workflow e os scripts de deploy.
- Confirmar via AWS CLI, somente leitura, o estado das stacks e da policy.
- Rodar `actionlint` e `cfn-lint` nos arquivos do pipeline/templates.
- Confirmar que a policy local e a versão default na AWS incluem as ações corrigidas.
- Produzir receipt em `.crew/handoffs/atividade-iii-deploy-verify.md`.

## Scope out
- Não criar, atualizar ou apagar stacks.
- Não publicar policy, não alterar IAM, não criar recursos AWS.
- Não fazer push, commit, merge ou disparar workflow no GitHub.
- Não alterar código de produção, templates ou scripts.
- Não imprimir secrets, access keys ou conteúdo de `.bootstrap.env`.

## Acceptance
- `devops-iii-dev` confirmada como inexistente.
- `devops-iv-spa` confirmada como `CREATE_COMPLETE`.
- Policy default `v7` confirmada; ações `ec2:GetSecurityGroupsForVpc`, `ec2:ModifyVpcAttribute`, `ec2:ModifySubnetAttribute` e `kms:DescribeKey` presentes.
- `actionlint` e `cfn-lint` executados com exit code registrado.
- Receipt com comandos, exit codes, riscos e próximo passo; nenhuma mutação AWS/GitHub.
- `git status --short` sem alterações além do próprio receipt.

## Verification
```bash
cd /home/christian-sperb/Documents/projects/unyleya/4P-Devops

aws cloudformation describe-stacks \
  --stack-name devops-iii-dev \
  --region us-east-2 --profile chrissperb \
  --query 'Stacks[0].StackStatus' --output text

aws cloudformation describe-stacks \
  --stack-name devops-iv-spa \
  --region us-east-2 --profile chrissperb \
  --query 'Stacks[0].{Status:StackStatus,Outputs:Outputs}' --output table

aws iam get-policy \
  --policy-arn arn:aws:iam::686420703845:policy/gha-4p-devops-deploy-policy \
  --profile chrissperb \
  --query 'Policy.{DefaultVersion:DefaultVersionId,Updated:UpdateDate}' --output json

python3 - <<'PY'
from pathlib import Path
import json
p = Path('atividade-iv-cicd/iam/deploy-role-policy.json')
s = p.read_text().replace('${AWS_REGION}', 'us-east-2').replace('${ACCOUNT_ID}', '686420703845')
data = json.loads(s)
actions = {a for st in data['Statement'] for a in (st['Action'] if isinstance(st['Action'], list) else [st['Action']])}
for a in ['ec2:GetSecurityGroupsForVpc','ec2:ModifyVpcAttribute','ec2:ModifySubnetAttribute','kms:DescribeKey']:
    print(a, a in actions)
print('minified_chars', len(json.dumps(data, separators=(',',':'))))
PY

/tmp/opencode/actionlint .github/workflows/deploy.yml
/tmp/opencode/cfnlint-venv/bin/cfn-lint atividade-iii-cloudformation/template.yaml atividade-iv-cicd/cloudformation/spa-hosting.yaml
```

## Constraints
- Somente leitura na AWS; não usar `--apply`, `delete-stack`, `create-change-set`, `execute-change-set` ou equivalentes.
- Não usar credenciais de deploy do GitHub; usar o perfil admin local apenas para leitura.
- Não expor secrets.
- Manter o repositório limpo, exceto o receipt.

## Rollback
Nenhuma mutação; não há rollback necessário. Se alguma verificação exigir mutação, parar e devolver `blocked`.
