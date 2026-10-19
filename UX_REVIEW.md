# UX Review (ui-ux-pro-max) — Layout containment / clipping / z-index / breakpoints

## Objetivo
Diagnosticar sobreposição/clipping de callouts lg:absolute e textos "faltando", priorizando contenção.

## Achados por seção
| Seção | Arquivo | Observação | Ação | Verificar
|---|---|---|---|---|
| Intro | src/components/Intro.jsx:46 | overflow-hidden no painel com lg:absolute | Tornar layer de posicionamento overflow-visible; manter wrapper visual (rounded+border+overflow-hidden) para fundo/SVG | 1440/1280/1024: callouts+LeaderLine completos; sem colisões
| Principles | src/components/Principles.jsx:22 | overflow-hidden no painel com lg:absolute | Mesma solução: separar camada visual do layer absoluto | Idem
| ThreeWays | src/components/ThreeWays.jsx:124 | overflow-hidden no painel com lg:absolute | Mesma solução + min-h lg:min-h-[520px] | Idem
| Examples | src/components/Examples.jsx:22 | overflow-hidden no painel com lg:absolute | Mesma solução + min-h lg:min-h-[440–480px] | Idem
| Callout | src/components/primitives/Callout.jsx:5 | Sem z-index explícito | Adicionar z-10 ao wrapper absoluto | Empilhamento consistente com arte
| LeaderLine | src/components/primitives/LeaderLine.jsx:24 | Absoluto; pode ser cortado por ancestral clipado | Garantir ancestral não clipa eixo de conexão (overflow-visible) | Conectores visíveis

## Recomendações práticas (Tailwind/React)
- **Contenção**: trocar overflow-hidden por overflow-visible no container que realmente hospeda callouts .lg:absolute. Manter cantos arredondados: usar wrapper interno com `overflow-hidden rounded-[28px]` para SVG/fundo; posicionar callouts no mesmo `.relative` pai (fora do wrapper interno).
- **Z-index**: `Callout` — classe base `lg:absolute ... z-10`; `LeaderLine` — `absolute ... z-10` (ou manter coerente).
- **Altura mínima**: `Intro/Principles/Examples` → `lg:min-h-[440px] xl:min-h-[480px]`; `ThreeWays` → `lg:min-h-[500px] xl:min-h-[540px]`.
- **Offsets**: pequenos ajustes por xl (1440+) para reduzir colisões: `lg:top-6 xl:top-8`, `lg:bottom-6 xl:bottom-8` onde aplicável.
- **Isolamento**: `relative isolate` no painel pai ajuda a criar stacking context estável.

## Verificação por breakpoint
| Viewport | Check | Pass/Fail
|---|---|---|
| 1440 | 0 overlaps lg:absolute; callouts+LeaderLine completos; sem clipping | ☐
| 1280 | Idem | ☐
| 1024 | Idem | ☐
| 768 | <lg sem absolute; sem overflow inesperado | ☐
| 375 | <lg sem absolute; sem overflow inesperado | ☐

## UX rationale (brief)
- Clipping por overflow-hidden = causa mais provável de "textos faltando" (cortados). Corrigir contenção resolve isso sem alterar copy/imagens.
- z-index explícito evita empilhamento inconsistente entre seções.
- Altura mínima + offsets responsivos evitam colisões internas em 1280–1440px.
