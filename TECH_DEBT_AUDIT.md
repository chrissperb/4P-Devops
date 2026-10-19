# Tech Debt Audit — 4P-Devops

## Executive summary
- Critical/High: Clipping por overflow-hidden em painéis com callouts lg:absolute (Intro/Principles/ThreeWays/Examples)
- Medium: Ausência de z-index explícito em Callout + LeaderLine sujeito a clipping
- Medium: Offsets absolutos podem colidir em 1280–1440px; falta min-height em painéis com múltiplos callouts

## Architectural mental model
SPA React+Vite+Tailwind v3.4, tema escuro, animações Framer Motion, arte SVG + callouts absolutos em seções com placas (Plate). Layout usa .relative com possíveis overflow-hidden.

## Findings table
| ID | Category | File:Line | Severity | Effort | Description | Recommendation |
|---|----------|-----------|----------|--------|-------------|----------------|
| F001 | Layout/Clipping | src/components/Intro.jsx:46 | High | S | Painel .relative.overflow-hidden contém callouts .lg:absolute — risco de cortar conteúdo/LeaderLine | Remover/ajustar overflow-hidden no layer que hospeda callouts; separar wrapper visual (rounded+border+overflow-hidden) do layer de posicionamento |
| F002 | Layout/Clipping | src/components/Principles.jsx:22 | High | S | Painel com overflow-hidden envolvendo SVG+callouts absolutos | Mesmo ajuste: contenção sem cortar conectores |
| F003 | Layout/Clipping | src/components/ThreeWays.jsx:124 | High | S | Painel com overflow-hidden envolvendo SVG+callouts absolutos | Garantir overflow-visible no container de callouts/LeaderLine |
| F004 | Layout/Clipping | src/components/Examples.jsx:22 | High | S | Painel com overflow-hidden envolvendo SVG+callouts absolutos | Mesmo ajuste |
| F005 | Z-index/Layering | src/components/primitives/Callout.jsx:5 | Medium | S | Callouts absolutos sem z-index explícito | Adicionar z-10 (e manter arte z-0; usar relative isolate se necessário) |
| F006 | Z-index/Clipping | src/components/primitives/LeaderLine.jsx:24 | Medium | S | LeaderLine absoluto pode ser cortado por overflow-hidden ancestral | Garantir ancestral não envolve eixo de conexão; preferir overflow-visible |
| F007 | Responsividade/Colisão | src/components/Intro.jsx:? | Medium | S | Offsets genéricos podem colidir em 1280–1440px | Ajustar lg:top-*/xl:top-* ou adicionar altura mínima ao painel |
| F008 | Altura/Reserva | src/components/ThreeWays.jsx:8 | Medium | S | Múltiplos callouts + SVG loop exigem altura mínima | Adicionar lg:min-h-[520px] ao painel relativo |
| F009 | Altura/Reserva | src/components/Intro.jsx:8 | Medium | S | Reserva vertical insuficiente para callouts | Adicionar lg:min-h-[440–480px] ao painel relativo |
| F010 | Altura/Reserva | src/components/Examples.jsx:6 | Medium | S | Reserva vertical insuficiente para callouts | Adicionar lg:min-h-[440–480px] ao painel relativo |

## Top 5 "if you fix nothing else, fix these"
1. F001 — Intro: ajustar contenção (overflow) para não cortar callouts/LeaderLine
2. F003 — ThreeWays: corrigir clipping + garantir altura mínima
3. F002 — Principles: corrigir clipping
4. F004 — Examples: corrigir clipping
5. F005/F006 — Callout/LeaderLine: z-index + contenção

## Quick wins
- [ ] F001–F004: remover/ajustar overflow-hidden no layer que hospeda lg:absolute (S)
- [ ] F005: adicionar z-10 em Callout absoluto (S)
- [ ] F008–F010: adicionar min-h responsivo nos painéis (S)
- [ ] F007: pequenos ajustes de offset por lg/xl (S)

## Things that look bad but are actually fine
- Manter overflow-hidden no wrapper visual (borda arredondada + gradiente) é aceitável se callouts estiverem fora desse wrapper clipado, no mesmo .relative pai.
- Mobile <lg sem absolute — sem problema.
- SVGs e textos não precisam alteração (apenas layout/posicionamento).
- Dark theme/colors já adequados.

## Open questions for the maintainer
- Preferir overflow-visible no painel externo (perde clipping estrito) ou reestruturar (wrapper interno clipado + callouts no mesmo pai)?
- Offsets exatos xl (1440+) para eliminar colisões residuais sem criar espaços excessivos?
- Há casos onde LeaderLine deve atravessar bordas arredondadas? Se sim, manter clip restrito.

## Architectural mental model (detalhado)
SPA com seções: Hero, Intro, Timeline, Principles, ThreeWays, Examples, Quiz, Footer. Primitives: Plate, Callout, LeaderLine. Figures SVG (SilosFigure, CamsFigure, OrgMapFigure, DevOpsLoop). MotionConfig reducedMotion="user". Tailwind com palette surface*/accent-bright. Callouts lg:absolute posicionados em painéis .relative com potencial overflow-hidden.

## Repeat-run notes
NEW findings: F001–F010 identificados nesta varredura. Nenhum RESOLVED marcado (primeira execução).
