---
type: handoff
status: done
owner: devops-andre
task: repo-clean-agent-artifacts
branch: chore/remove-agent-artifacts
base: main/main @ 696c67e
commit: 2c4f746
pushed: false
date: 2026-11-16
---

# Handoff — repo-clean-agent-artifacts

## Status
DONE. Branch `chore/remove-agent-artifacts` criada a partir de `main/main` (`696c67e`),
artefatos de agentes removidos do índice do Git, `.gitignore` atualizado, commit único
`2c4f746`. **Nenhum push/merge/PR executado** — push é ação do usuário.

## Comandos executados

| # | Comando | Exit |
|---|---------|------|
| 1 | `git fetch main main` | 0 |
| 2 | `git switch -c chore/remove-agent-artifacts main/main` | 0 |
| 3 | `git branch --unset-upstream` | 0 |
| 4 | `git rm -r --cached .crew .claude CORRECTION_PLAN.md TECH_DEBT_AUDIT.md UX_REVIEW.md VERIFICATION_CHECKLIST.md PROJECT.md docs/specs/atividade-iii-rede-https.md` | 0 |
| 5 | `git add .gitignore` | 0 |
| 6 | `git commit -m "chore: move artefatos de agentes para escopo local"` | 0 |
| 7 | `git status --short` | 0 (saída vazia) |
| 8 | `git ls-files \| grep -E '^(\.crew/\|\.claude/\|PROJECT\.md$\|CORRECTION_PLAN\.md$\|TECH_DEBT_AUDIT\.md$\|UX_REVIEW\.md$\|VERIFICATION_CHECKLIST\.md$\|docs/specs/)'` | 1 (nenhum match = OK) |

## Arquivos removidos do índice (12)

```
.claude/napkin.md
.crew/decisions/atividade-iii-rede-https.md
.crew/handoffs/iii-https-conditional.md
.crew/handoffs/iii-private-subnets.md
.crew/tasks/iii-https-conditional.md
.crew/tasks/iii-private-subnets.md
CORRECTION_PLAN.md
PROJECT.md
TECH_DEBT_AUDIT.md
UX_REVIEW.md
VERIFICATION_CHECKLIST.md
docs/specs/atividade-iii-rede-https.md
```

Usei `--cached` com paths explícitos; nenhum arquivo foi apagado do disco.

## `.gitignore` (bloco adicionado, 10 linhas)

```gitignore

# Artefatos de agentes/revisões — somente escopo local, nunca commitar
.crew/
.claude/
CORRECTION_PLAN.md
TECH_DEBT_AUDIT.md
UX_REVIEW.md
VERIFICATION_CHECKLIST.md
PROJECT.md
docs/specs/
```

Restante do `.gitignore` inalterado. `git check-ignore -v` confirma match nas linhas 15-22.

## Confirmação de preservação local

```
local-preserved .crew
local-preserved .claude
local-preserved CORRECTION_PLAN.md
local-preserved TECH_DEBT_AUDIT.md
local-preserved UX_REVIEW.md
local-preserved VERIFICATION_CHECKLIST.md
local-preserved PROJECT.md
local-preserved docs/specs/atividade-iii-rede-https.md
```

## Aceitação

- [x] Branch criada a partir de `main/main` — `git merge-base --is-ancestor main/main HEAD` OK, `rev-list --count main/main..HEAD` = 1.
- [x] `git ls-files` não lista nenhum caminho removido (grep exit 1).
- [x] Arquivos locais existem (`test -e` para os 8 caminhos).
- [x] `.gitignore` contém o bloco.
- [x] Commit único `2c4f746` (13 files changed, 10 insertions, 870 deletions).
- [x] `git status --short` vazio após commit.
- [x] Nenhum push/merge/PR.

## Escopo respeitado

Nenhuma alteração em `.github/workflows/**`, `atividade-iii-cloudformation/**`,
`atividade-iv-cicd/**`, `README.md`, `estudo-de-caso/**`, `src/**`. Sem `git clean`,
`git reset --hard`, `filter-branch`/`filter-repo` ou rebase. Arquivos não rastreados
pré-existentes em `.crew/` (decisões/handoffs/tasks de outras sessões) continuam no
disco e agora são ignorados.

## Entrega ao usuário (push manual)

```bash
cd /home/christian-sperb/Documents/projects/unyleya/4P-Devops
git push -u main chore/remove-agent-artifacts
```

Depois: abrir PR `chore/remove-agent-artifacts` -> `main`. Se o merge for por
fast-forward/squash, o histórico da `main` recebe um único commit de limpeza.

## Riscos / notas

1. **Blobs antigos permanecem no histórico.** `git rm --cached` só limpa a árvore
   atual; os 870 deletions não removem os objetos do histórico. O conteúdo desses
   arquivos continua recuperável via commits anteriores na `main` pública. Se a
   exigência for apagar de fato do GitHub, é preciso `git filter-repo` + force-push
   (destrutivo, fora de escopo, exige aprovação explícita).
2. **Upstream foi desvinculado de propósito.** `git switch -c ... main/main` setou
   upstream para `main/main`, o que faria um `git push` sem argumentos empurrar para
   a branch `main`. Rodei `git branch --unset-upstream` antes do commit para eliminar
   esse risco. Use `git push -u main chore/remove-agent-artifacts` explicitamente.
3. `docs/specs/` inteiro passa a ser ignorado. Se no futuro specs precisarem ser
   versionados, é necessário `git add -f` ou trocar por padrões mais específicos.
4. Este receipt vive em `.crew/handoffs/`, caminho agora ignorado — não aparecerá no
   commit nem no PR, por design.

## Rollback

- Antes do push: `git switch -` e `git branch -D chore/remove-agent-artifacts`.
- Depois do push/merge: `git revert 2c4f746` na branch e novo PR (não reescrever a `main`).
- Restaurar arquivos no índice sem tocar no disco: `git checkout 696c67e -- .crew .claude CORRECTION_PLAN.md TECH_DEBT_AUDIT.md UX_REVIEW.md VERIFICATION_CHECKLIST.md PROJECT.md docs/specs/`.
