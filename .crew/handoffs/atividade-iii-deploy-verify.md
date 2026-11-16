---
type: handoff
id: atividade-iii-deploy-verify
task: .crew/tasks/atividade-iii-deploy-verify.md
owner: devops-andre
status: done
divergence: true
date: 2026-11-16
region: us-east-2
account: "686420703845"
mutations: none
---

# Receipt — atividade-iii-deploy-verify

## Resumo

Verificação somente leitura concluída. O bloqueio de IAM está resolvido e **comprovado
por deploy real**: a policy `gha-4p-devops-deploy-policy` está na default `v7`
(publicada `2026-11-16T08:06:43Z`) e a stack `devops-iii-dev` foi criada com sucesso
às `08:16:10Z`, chegando a `CREATE_COMPLETE` às `08:25:09Z` — ou seja, o usuário já
reexecutou o workflow e ele passou.

**Divergência com o brief:** o brief afirma que `devops-iii-dev` está apagada e deve
estar ausente. Ela **existe e está `CREATE_COMPLETE`**. Nada a corrigir: a premissa
ficou obsoleta porque o deploy que a task queria desbloquear já ocorreu e teve êxito.

## Acceptance

| # | Critério | Resultado |
| --- | --- | --- |
| 1 | `devops-iii-dev` inexistente | NÃO SE APLICA — existe `CREATE_COMPLETE` (E2) |
| 2 | `devops-iv-spa` `CREATE_COMPLETE` | OK (E3) |
| 3 | Policy default `v7` + 4 ações | OK (E4, E5) |
| 4 | `actionlint` e `cfn-lint` com exit code | OK rc=0 / rc=0 (E6, E7) |
| 5 | Receipt + zero mutação AWS/GitHub | OK (E8) |
| 6 | `git status --short` limpo exceto receipt | 2 arquivos de task não rastreados, pré-existentes (E9) |

## Comandos executados e exit codes

Todos com `AWS_PROFILE=chrissperb`, região `us-east-2`, identidade
`assumed-role/AccountFullAccessRole` (perfil admin local, uso apenas de leitura).

| # | Comando | RC |
| --- | --- | --- |
| E1 | `aws sts get-caller-identity` | 0 |
| E2 | `aws cloudformation describe-stacks --stack-name devops-iii-dev` | 0 |
| E2b | `aws cloudformation describe-stack-events --max-items 10` | 0 |
| E3 | `aws cloudformation describe-stacks --stack-name devops-iv-spa` | 0 |
| E4 | `aws iam get-policy --policy-arn .../gha-4p-devops-deploy-policy` | 0 |
| E4b | `aws iam list-policy-versions` / `list-entities-for-policy` | 0 |
| E5 | `aws iam get-policy-version --version-id v7` + parse de ações | 0 |
| E5b | parse local `atividade-iv-cicd/iam/deploy-role-policy.json` | 0 |
| E5c | diff normalizado local x remoto (16 statements) | 0 |
| E6 | `/tmp/opencode/actionlint .github/workflows/deploy.yml` | 0 |
| E6b | `/tmp/opencode/actionlint` (todos os workflows) | 0 |
| E7 | `/tmp/opencode/cfnlint-venv/bin/cfn-lint <III> <SPA>` | 0 |
| E8 | checagem HTTP SPA (`/`, `/reflexao/`, http->https) | 0 |
| E9 | `git status --short` | 0 |

## Evidências

**E2 — `devops-iii-dev`**
- `StackStatus: CREATE_COMPLETE`, `DisableRollback: false`, `Drift: NOT_CHECKED`
- `CreationTime: 2026-11-16T08:16:10Z`; evento final `CREATE_COMPLETE` em `08:25:09Z`
  -> duração de criação ~= **8m59s**
- Sem evento de `ROLLBACK`; último recurso criado: `Database` (`08:25:07Z`)
- Outputs: `InstanceId i-0a98fbda371d1afb2`,
  `DatabaseEndpoint devops-iii-dev-database-pi2raefqigxx.c7gy02cwqted.us-east-2.rds.amazonaws.com`,
  `DatabaseSecretArn ...secret:rds!db-fa40a409-...` (secret gerenciado pelo RDS),
  `WebsiteUrl http://devops-LoadB-zwiGm5J7Ffem-2130031902.us-east-2.elb.amazonaws.com`
- Parâmetros: `Environment=dev`, `DBName=appdb`, `DBUsername=dbadmin`,
  `DomainName=""`, `CertificateArn=""` (sem HTTPS no ALB — esperado em dev)

**E3 — `devops-iv-spa`**
- `StackStatus: CREATE_COMPLETE`
- `WebsiteUrl https://d3k82v3nqyy7lx.cloudfront.net`
- `BucketName devops-iv-spa-686420703845-us-east-2`
- `DistributionId E12DMTME4XTP6`

**E4 — Policy**
- `DefaultVersionId: v7`, `UpdateDate: 2026-11-16T08:06:43Z`, `AttachmentCount: 1`
- Versões: `v7` (default, 08:06:43), `v6` (01:10:12), `v5` (01:04:45)
- Anexada apenas à role `gha-4p-devops-deploy` (sem users/groups)

**E5 — Ações exigidas na v7**

| Ação | Presente |
| --- | --- |
| `ec2:GetSecurityGroupsForVpc` | sim |
| `ec2:ModifyVpcAttribute` | sim |
| `ec2:ModifySubnetAttribute` | sim |
| `kms:DescribeKey` | sim |

- `kms:DescribeKey` está em statement com `Resource: arn:aws:kms:us-east-2:686420703845:key/*`
  — cobre a chave `aws/secretsmanager` exigida por `ManageMasterUserPassword: true`
  (template III, linha 689)
- Contagem de ações: local 152 = remoto 152; statements 16 = 16; diff normalizado
  (`Sid`/`Effect`/`Action`/`Resource`/`Condition`) **idêntico**

**E6/E7 — Lints**
- `actionlint 1.7.12` -> rc=0, sem achados (deploy.yml e todos os workflows)
- `cfn-lint 1.60.1` -> rc=0, sem achados (template III + spa-hosting)

**E8 — SPA pública (read-only HTTP)**
- `/` -> `200`; `/reflexao/` -> `200`; `http://` -> `301` (redirect para HTTPS)

**E9 — Repositório**
- `git status --short`: apenas `.crew/tasks/atividade-iii-deploy-verify.md` e
  `.crew/tasks/crew-marina-role-boundary.md` não rastreados — **pré-existentes**,
  não criados nesta execução. Nenhum arquivo de código/template/script tocado.
- Branch: `feature/atividade-iv-cicd-pipeline`; HEAD `13a1e9a fix(atividade-iv):
  permite KMS DescribeKey do RDS Secrets Manager`
- `atividade-iv-cicd/.bootstrap.env` **existe** e está no `.gitignore` — conteúdo
  não lido, conforme regra

## Pipeline inspecionado

`.github/workflows/deploy.yml`, 5 jobs, sem `pull_request_target`:

| Job | Trigger | Timeout | Notas |
| --- | --- | --- | --- |
| `validate` | push/PR/manual | 15m | `npm ci` + `build:ci` + cfn-lint + actionlint; sobe `spa-dist` |
| `plan` | PR (mesmo repo) | 20m | change sets, nada aplicado; comenta tabela no PR |
| `deploy` | push `main` / manual `apply` | 75m | `environment: production` (aprovação), aplica SPA + III |
| `verify` | após `deploy` ok | 10m | HTTP `/`, `/reflexao/`, asset, redirect 301 |
| `destroy` | manual `destroy` | 75m | esvazia bucket e apaga stacks |

Achados positivos: build uma vez e promove o mesmo artifact (`spa-dist` ->
`download-artifact`); concorrência por ref com `cancel-in-progress: false`;
`permissions` mínimas (`contents: read`, `pull-requests: write`); sem interpolação
de `${{ }}` dentro de shell (valores chegam por `env`); sem chaves de cloud
hardcoded no repositório.

## Riscos

1. **Credencial estática em vez de OIDC (residual, aceito e documentado).** O
   pipeline usa `secrets.AWS_ACCESS_KEY_ID` + `AssumeRole` porque a SCP da conta
   nega `iam:*Provider*`. É o desvio consciente ao padrão de menor privilégio
   federado. Mitigação: usuário restrito a `sts:AssumeRole`, ExternalId, role
   escopada, `rotate-key.sh` para rotação.
2. **Policy ampla:** 152 ações — `ec2:*Vpc*`, `ec2:Modify*Attribute` e `key/*`
   dão folga maior que o estritamente necessário. Funciona, mas aumentar escopo
   fica fácil demais.
3. **Sem rollback automatizado versionado.** `destroy` recria do zero; não há
   promote de artefato imutável nem `rollback-stack` no pipeline. Para UPDATE com
   falha, o CloudFormation faz auto-rollback (bom), mas um caso
   `UPDATE_ROLLBACK_FAILED` exige intervenção manual.
4. **Artifact retido 14 dias.** Não há release tagueada nem versionamento do
   template aplicado; reconstruir o estado exige checkout do commit.
5. **ALB em HTTP sem certificado** (`CertificateArn=""`) — aceitável em `dev`,
   inaceitável se alguém apontar domínio público para lá.
6. **Lint local != lint do CI:** aqui rodei `cfn-lint` em modo padrão; o CI usa
   `--non-zero-exit-code error`. Ambos passaram, mas o CI pode reportar warnings
   que não bloqueiam.
7. **Sem evidência de run id/link** — `gh` CLI não está instalado nesta máquina e
   o agente não tem credencial GitHub. Duração do deploy inferida pelo tempo de
   criação da stack (~9m), não pelo log do run.

## Próximo passo

1. **Nenhuma correção de IAM necessária.** O deploy já provou a policy v7.
2. Quando o usuário reexecutar o workflow: `devops-iii-dev` está `CREATE_COMPLETE`,
   então o script entrará no caminho `UPDATE`. Esperado: change set vazio ->
   `unchanged` (sem erro). Se quebrar, atualizar este receipt com o erro real em
   vez de reabrir hipótese de IAM.
3. Confirmar no log do run que `Aplicar stack da Atividade III` passou e que
   `verify` fechou 200/200/301 — este receipt prova o estado final, não o log.
4. Opcional (fora de escopo desta task, exige mutação e aprovação): apertar a
   policy para as ações efetivamente usadas e migrar para OIDC se a SCP for revista.

## Rollback

Nenhuma mutação foi executada — não há o que reverter. Se em algum momento for
preciso desfazer o ambiente (ação do usuário, exige aprovação explícita):

```bash
# Remove SPA + infraestrutura (workflow manual, environment production aprova)
gh workflow run deploy.yml -f action=destroy -f skip_infra=false

# Ou remover só a stack da Atividade III via CLI
AWS_PROFILE=chrissperb aws cloudformation delete-stack --stack-name devops-iii-dev --region us-east-2
AWS_PROFILE=chrissperb aws cloudformation wait stack-delete-complete --stack-name devops-iii-dev --region us-east-2
```
