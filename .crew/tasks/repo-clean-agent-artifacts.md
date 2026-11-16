---
type: task
status: done
owner: devops-andre
priority: P0
depends_on: []
id: repo-clean-agent-artifacts
---

# repo-clean-agent-artifacts — Remover artefatos de agentes do GitHub

## Goal
Criar uma branch limpa a partir da `main` remota, retirar do índice do Git os artefatos de agentes/revisões e deixar os arquivos preservados apenas no disco local, com `.gitignore` atualizado.

## Context
- O usuário quer o repositório GitHub sem definições/registros dos agentes; esses arquivos devem existir apenas localmente.
- `main/main` está em `696c67e` e é a base correta. A branch local `feature/atividade-iv-cicd-pipeline` tem o commit `13a1e9a` não presente na `main`; **não** usar essa branch como base.
- Arquivos existentes no disco que devem permanecer locais: `.crew/`, `.claude/`, `CORRECTION_PLAN.md`, `TECH_DEBT_AUDIT.md`, `UX_REVIEW.md`, `VERIFICATION_CHECKLIST.md`, `PROJECT.md`, `docs/specs/atividade-iii-rede-https.md`.
- Não há `gh` autenticado nem credential helper configurado; não tentar push interativo.

## Inputs
- Repositório: `/home/christian-sperb/Documents/projects/unyleya/4P-Devops`
- Base: `main/main` (`696c67e`)
- `.gitignore` atual: `node_modules`, `dist`, `dist-ssr`, `*.local`, `.DS_Store`, `.vite`, logs e `atividade-iv-cicd/.bootstrap.env`.

## Scope in
- Atualizar `main/main` com `git fetch main main`.
- Criar branch `chore/remove-agent-artifacts` a partir de `main/main`.
- Executar `git rm -r --cached` para:
  - `.crew/`
  - `.claude/`
  - `CORRECTION_PLAN.md`
  - `TECH_DEBT_AUDIT.md`
  - `UX_REVIEW.md`
  - `VERIFICATION_CHECKLIST.md`
  - `PROJECT.md`
  - `docs/specs/atividade-iii-rede-https.md`
- Adicionar ao `.gitignore` um bloco para esses caminhos:
  - `.crew/`
  - `.claude/`
  - `CORRECTION_PLAN.md`
  - `TECH_DEBT_AUDIT.md`
  - `UX_REVIEW.md`
  - `VERIFICATION_CHECKLIST.md`
  - `PROJECT.md`
  - `docs/specs/`
- Commitar na branch com mensagem clara.
- Verificar que os arquivos continuam no disco.
- Verificar que não aparecem mais em `git ls-files`.

## Scope out
- Não apagar arquivos do disco.
- Não usar `git rm` sem `--cached`.
- Não reescrever histórico (`filter-branch`, `filter-repo`, rebase interativo).
- Não fazer merge, push, PR ou force-push.
- Não alterar código, workflow, templates ou READMEs do produto.
- Não remover `.github/workflows/**`, `atividade-iii-cloudformation/**`, `atividade-iv-cicd/**`, `README.md`, `estudo-de-caso/**`, `src/**`.

## Acceptance
- Branch `chore/remove-agent-artifacts` criada a partir de `main/main`.
- `git ls-files` não lista nenhum dos caminhos removidos.
- Arquivos locais continuam existindo (`test -e`).
- `.gitignore` contém o bloco de artefatos locais.
- Commit único e limpo na branch.
- `git status --short` limpo após o commit.
- Nenhum push/merge/PR executado.

## Verification
```bash
cd /home/christian-sperb/Documents/projects/unyleya/4P-Devops
git fetch main main
git switch -c chore/remove-agent-artifacts main/main

git rm -r --cached \
  .crew .claude \
  CORRECTION_PLAN.md TECH_DEBT_AUDIT.md UX_REVIEW.md VERIFICATION_CHECKLIST.md \
  PROJECT.md docs/specs/atividade-iii-rede-https.md

# adicionar bloco ao .gitignore

git add .gitignore
git commit -m "chore: move artefatos de agentes para escopo local"

git status --short
git ls-files | grep -E '^(\.crew/|\.claude/|PROJECT\.md$|CORRECTION_PLAN\.md$|TECH_DEBT_AUDIT\.md$|UX_REVIEW\.md$|VERIFICATION_CHECKLIST\.md$|docs/specs/)' || true

for p in .crew .claude CORRECTION_PLAN.md TECH_DEBT_AUDIT.md UX_REVIEW.md VERIFICATION_CHECKLIST.md PROJECT.md docs/specs/atividade-iii-rede-https.md; do
  test -e "$p" && echo "local-preserved $p"
done

git log --oneline -1
git diff --stat HEAD~1..HEAD
```

## Constraints
- Não usar `git push`; não há credencial e o push é ação do usuário.
- Preservar alterações locais pré-existentes; não usar `git clean`, `git reset --hard` ou `git checkout -- .`.
- Não tocar em `.gitignore` além do bloco novo.
- Não imprimir secrets.
- Manter o worktree sem arquivos não rastreados além dos artefatos agora ignorados.

## Rollback
Se algo sair errado antes do commit: `git switch -` e remover a branch com
`git branch -D chore/remove-agent-artifacts`. Depois do commit, o rollback é
`git revert <commit>` na branch; não reescrever a `main`.
