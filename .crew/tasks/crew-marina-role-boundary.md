---
type: task
status: done
owner: agentmanager-otavio
priority: P1
depends_on: []
id: crew-marina-role-boundary
---

# crew-marina-role-boundary — Propor ajuste de fronteira de papéis da Marina

## Goal
Propor um patch textual para a descrição/system prompt da Marina que impeça execução direta de mutações de produção e exija dispatch para o especialista + receipt, sem aplicar o patch.

## Context
- Incidente: nesta sessão, a Marina executou diretamente mudanças de produção na AWS — publicação de policy IAM, validações com role e `delete-stack` — em vez de criar task e despachar `devops-andre`.
- O usuário aprovou a correção, mas pediu que o comportamento seja formalizado na descrição da Marina.
- O contrato atual do crew já diz que Marina despacha e que especialistas executam; a descrição da Marina precisa refletir isso de forma operacional e sem ambiguidade.
- Otávio pode propor patches de crew, mas nunca aplicá-los sem aprovação humana.

## Inputs
- Descrições/configurações dos agentes disponíveis no ambiente local (localizar; provável `~/.config/opencode/` ou equivalente).
- `AGENTS.md` do projeto: `/home/christian-sperb/Documents/projects/unyleya/4P-Devops/AGENTS.md`.
- Skill `task-protocol`: `/home/christian-sperb/.config/opencode/skills/crew/task-protocol/SKILL.md`.
- Histórico do incidente: policy IAM publicada diretamente, stack `devops-iii-dev` apagada diretamente, validações AWS executadas pela Marina.
- Decisões existentes em `.crew/decisions/`.

## Scope in
- Localizar o arquivo que define a descrição/system prompt da Marina.
- Comparar a descrição atual com o contrato de papéis do crew.
- Propor redação exata para:
  - deixar explícito que Marina não executa mutações AWS/GitHub/DB;
  - exigir task brief + dispatch para `devops-andre` (ou especialista do domínio);
  - permitir apenas inspeção read-only pela Marina;
  - definir exceção de emergência somente com aprovação explícita do usuário e decision record;
  - exigir receipt antes de fechar.
- Escrever a proposta em `.crew/decisions/crew-marina-role-boundary.md`, com diff textual e checklist de aprovação.
- Escrever receipt em `.crew/handoffs/crew-marina-role-boundary.md`.

## Scope out
- Não editar a descrição da Marina nem qualquer configuração de agente.
- Não editar código, templates, workflow, IAM ou documentação de produto.
- Não executar AWS CLI, Git push, merge ou ações no GitHub.
- Não alterar a descrição de outros agentes além de mencionar impacto, se necessário.
- Não aplicar o patch; apenas propor.

## Acceptance
- Caminho exato do arquivo de descrição da Marina identificado, ou declarado como não localizado com hipótese.
- Proposta com texto/diff pronto para aplicação, sem ambiguidade sobre o que Marina pode e não pode fazer.
- Proposta preserva as responsabilidades atuais: intake, council, spec gate, plano/DAG, dispatch, tracking, gate, close, retro.
- Proposta inclui regra de exceção e aprovação humana.
- Nenhum arquivo de configuração alterado.
- `git status --short` mostra apenas `.crew/decisions/crew-marina-role-boundary.md` e `.crew/handoffs/crew-marina-role-boundary.md`.

## Verification
```bash
cd /home/christian-sperb/Documents/projects/unyleya/4P-Devops
git status --short
sed -n '1,220p' .crew/decisions/crew-marina-role-boundary.md
sed -n '1,160p' .crew/handoffs/crew-marina-role-boundary.md
```

## Constraints
- Não aplicar patch; aprovação humana é obrigatória.
- Não usar caveman na proposta; texto claro e operacional.
- Não expor secrets ou credenciais.
- Manter o escopo em descrição de agente, não em código de produto.

## Rollback
Nenhuma alteração de configuração será feita. Se o patch for aprovado depois, o rollback é restaurar o texto anterior da descrição; registrar no decision record.
