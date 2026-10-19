# Infográfico DevOps — Dark Theme Layout Review
Goal: Corrigir sobreposição de imagens/textos e clipping de callouts nas seções com arte SVG (Intro, Principles, ThreeWays, Examples), mantendo tema escuro, textos/imagens intactos, sem regressões.
DoD: 0 colisões entre callouts lg:absolute em 1440/1280/1024; 0 clipping (callouts + LeaderLine completos); sem textos faltando por overflow; build OK; 0 erros de console; mobile <lg intacto; reduced-motion OK; tema escuro preservado.
Status: done

## Milestones
1. [x] M1 — Diagnóstico (tech-debt-audit) — DoD: TECH_DEBT_AUDIT.md completo
2. [x] M2 — Revisão UX (ui-ux-pro-max) — DoD: UX_REVIEW.md com recomendações por seção + breakpoints
3. [x] M3 — Plano consolidado (project-manager) — DoD: CORRECTION_PLAN.md com tarefas 1–2 arquivos, diffs-esboço, prioridade
4. [x] M4 — Critérios de verificação — DoD: VERIFICATION_CHECKLIST.md
5. [x] M5 — Fechamento — DoD: relatório delta DONE/WIP/BLOCKED/NEXT; PROJECT.md atualizado

## Assumption ledger
| # | Decision | Made at | Revisit when |
|---|----------|---------|--------------|
| A1 | Clipping por overflow-hidden em painéis com callouts lg:absolute é causa raiz de "textos faltando" | Fase 0 | Audit contradisser achados |
| A2 | Priorizar contenção (remover/ajustar overflow + altura mínima) vs reposicionar | Fase 0 | Impacto em bordas/gradiente inviabilizar estética |
| A3 | Preservar cantos arredondados sem cortar conectores (separar camada visual do layer de callouts) | Fase 0 | Solução impedir LeaderLine |
| A4 | Não modificar textos/imagens/SVGs; apenas layout/posicionamento | Fase 0 | Exceção técnica clara necessária |

## Risk/blocker register
| ID | Risk | Impact | Likelihood | Mitigation | Status |
|----|------|--------|------------|------------|--------|
| R1 | Remover overflow-hidden quebra bordas arredondadas/gradiente | Med | Baixa | Separar wrapper visual (borda+rounded+overflow-hidden p/ fundo/SVG) e manter callouts no mesmo relative com overflow-visible | open |
| R2 | Ajustes de offset causam regressão em breakpoints | Med | Média | Testar 1440/1280/1024/768/375; ajustar por xl/lg | open |
| R3 | LeaderLine cortado ao ajustar contenção | Alta | Baixa | Garantir espaço suficiente; evitar envolver conectores em clip | open |

## Next actions
- [x] M5: relatório delta gerado; correções aplicadas e verificadas
