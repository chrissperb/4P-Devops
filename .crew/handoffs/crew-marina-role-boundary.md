---
type: Handoff
id: crew-marina-role-boundary
task: .crew/tasks/crew-marina-role-boundary.md
title: Proposta de fronteira de papel da Marina (sem mutações de produção)
status: done
owner: agentmanager-otavio
generated:
  by: agent:agentmanager-otavio
  model: deepseek-v4.1-flash-free
  at: 2026-11-16T00:00:00Z
recorded_by: pm-marina
scope:
  changed: []
  produced:
    - .crew/decisions/crew-marina-role-boundary.md
  untouched:
    - /home/christian-sperb/.config/opencode/agents/pm-marina.md
    - /home/christian-sperb/.config/opencode/docs/crew.md
    - qualquer outro agente ou permissão
---

# Receipt — crew-marina-role-boundary

## Status

`done`. Proposta completa produzida e salva em
`.crew/decisions/crew-marina-role-boundary.md`. Nenhum arquivo de configuração
de agente foi alterado, nenhum comando de escrita AWS/GitHub/DB foi executado,
nada foi aplicado.

## Bloqueio de entrega original

O agente `agentmanager-otavio` tem `edit: "*" deny` com allow apenas em
`.crew/retro/**`. O harness negou a escrita em `.crew/decisions/` e
`.crew/handoffs/`. O conteúdo foi entregue no chat e gravado pela Marina nos
caminhos canônicos, sem contornar o deny via shell.

## Resumo

- Arquivo alvo identificado: `/home/christian-sperb/.config/opencode/agents/pm-marina.md`.
- Lacuna: prompt não proíbe mutação direta; permite `shell: "*" effect: ask` e só
  diz "You do not write production code".
- Patch proposto: alteração de `description`, ajuste do passo 5 (Dispatch), nova
  seção `## Execution boundary` (proibições AWS/GitHub/DB, allowlist read-only,
  caminho obrigatório task → dispatch → receipt → gate, exceção de emergência
  com aprovação explícita + decision record) e 2 hard rules novas.
- Responsabilidades atuais preservadas (intake, council, spec gate, DAG,
  tracking, gate, close, retro).
- Follow-up separado sugerido: endurecer permissões de `shell` para padrões de
  escrita — exige aprovação própria.

## Arquivos

- Nenhum arquivo do projeto alterado (`scope.changed: []`).
- Proposta: `.crew/decisions/crew-marina-role-boundary.md`.
- Descrição da Marina: intocada.

## Comandos

- `git status --short` → exit 0 → apenas tasks/handoffs do ciclo atual.
- `grep -ril marina ~/.config/opencode` → exit 0 → localizou
  `agents/pm-marina.md`, `docs/crew.md`, `AGENTS.md`, skills `crew/*`.
- `ls -R ~/.config/opencode/agents` → exit 0 → 15 agentes, roster confirmado.
- Nenhum `aws`, `git push`, `git merge` ou `gh` de escrita executado.

## Testes

Nenhum teste de produto aplicável (mudança é documental). Eval da mudança
proposta descrita no decision record (`.crew/evals/pm-marina.yaml`, 5 casos) —
não executada, pois o patch não foi aplicado.

## Riscos

- A proposta é apenas texto; enquanto não aplicada, o comportamento da Marina é o
  atual (risco de nova mutação direta permanece).
- Sem endurecimento de permissão, o `ask` de shell continua permitindo escrita se
  o humano aprovar o prompt.
- `AGENTS.md` do projeto citado na task não existe; contrato aplicável é o global.

## Follow-ups

1. Aprovação humana do patch (checklist no decision record).
2. Aplicar em branch do repo `~/.config/opencode`, rodar
   `validate-agents.py` + `build-skill-catalog.py`.
3. Criar fixture `.crew/evals/pm-marina.yaml` e rodar baseline vs. patch.
4. Decidir sobre task separada de endurecimento de permissões.
