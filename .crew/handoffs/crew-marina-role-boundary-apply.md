---
type: Handoff
id: crew-marina-role-boundary-apply
task: .crew/tasks/crew-marina-role-boundary.md
title: Aplicação do patch de fronteira de papel da Marina
status: done
owner: pm-marina
date: 2026-11-16
scope:
  changed:
    - /home/christian-sperb/.config/opencode/agents/pm-marina.md
  untouched:
    - /home/christian-sperb/.config/opencode/AGENTS.md (modificação pré-existente)
    - /home/christian-sperb/.config/opencode/opencode.json (untracked pré-existente)
    - /home/christian-sperb/.config/opencode/docs/crew.md
---

# Receipt — crew-marina-role-boundary-apply

## Status

`done`. Patch aplicado em branch separada do repo de configuração, com validação.
Sem merge na `main`; sem push.

## Resumo

- Branch: `crew/marina-role-boundary`
- Worktree: `/tmp/opencode/opencode-marina-role-boundary`
- Commit: `f372a10 docs(crew): restringe Marina a dispatch e inspecao read-only`
- Arquivo alterado: `agents/pm-marina.md` (+58/−4)
- Alterações: `description`, passo 5 (Dispatch), seção `## Execution boundary` e
  duas hard rules.
- `AGENTS.md` e `opencode.json` do repo principal eram modificações pré-existentes
  e não foram tocados.

## Comandos

| Comando | Exit | Evidência |
| --- | --- | --- |
| `git worktree add -b crew/marina-role-boundary ... HEAD` | 0 | worktree criado |
| `python3 tools/validate-agents.py` (antes) | 0 | `0 error(s), 0 warning(s)` |
| `python3 tools/validate-agents.py` (depois) | 0 | `0 error(s), 0 warning(s)` |
| `python3 tools/build-skill-catalog.py` | 0 | catálogo gerado; efeito colateral revertido no repo principal |
| `git restore -- skills/.catalog/...` | 0 | catálogo principal limpo |
| `git diff --check` | 0 | sem whitespace errors |
| `git commit` | 0 | `f372a10` |

## Testes

- `validate-agents.py`: 15 agentes, 0 erros, 0 warnings.
- `build-skill-catalog.py`: exit 0. Observação: o script gravou em
  `/home/christian-sperb/.config/opencode/skills/.catalog`; os três arquivos
  rastreados foram restaurados, pois não fazem parte do patch.
- Eval `.crew/evals/pm-marina.yaml` não criado/executado; fica como follow-up.

## Riscos

- Patch está em branch; enquanto não houver merge, o agente em execução continua
  com o prompt antigo.
- Sem endurecimento de permissões de shell, o `ask` ainda permite mutação se o
  humano aprovar o prompt.
- O worktree `/tmp/opencode/opencode-marina-role-boundary` pode ser removido
  depois da revisão; a branch permanece no repo.

## Follow-ups

1. Revisar o diff da branch `crew/marina-role-boundary`.
2. Fazer merge no repo `~/.config/opencode` após aprovação.
3. Criar e rodar `.crew/evals/pm-marina.yaml` (baseline vs. patch).
4. Abrir task separada para endurecer permissões de `shell`.
