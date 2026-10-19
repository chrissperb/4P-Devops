# Plano de Correção Consolidado (M3)

Prioridade: contenção > posicionamento > hierarquia. Sem execução (somente plano).

## Arquivos-alvo
1. src/components/primitives/Callout.jsx
2. src/components/Intro.jsx
3. src/components/Principles.jsx
4. src/components/ThreeWays.jsx
5. src/components/Examples.jsx
6. src/components/primitives/LeaderLine.jsx (verificação)

## Tarefas pequenas (1–2 arquivos)

### T1 — Callout: z-index
- Arquivo: Callout.jsx
- Mudança: adicionar z-10 ao wrapper absoluto
- Justificativa: evita empilhamento inconsistente
- Risco: baixo
- Verif: arte abaixo, callouts acima

Diff-esboço:
```jsx
// Callout.jsx: wrapper absoluto
<span
  className={`lg:absolute pointer-events-none ${posClass} ${className} z-10`}
  style={style}
>
```

### T2 — Intro: contenção + altura + offsets
- Arquivo: Intro.jsx
- Mudança: reestruturar painel — wrapper visual interno com overflow-hidden rounded-[28px] border bg-gradient/fundo; manter callouts no mesmo .relative pai (fora do wrapper interno) OU trocar overflow-hidden do painel externo por overflow-visible. Adicionar min-h. Ajustar offsets pontuais xl/lg.
- Justificativa: corta clipping (resolve "textos faltando")
- Risco: R1/R2/R3 mitigados (separar camada visual)

Diff-esboço (conceito):
```jsx
// Antes: painel com overflow-hidden único
<div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ...">
// Depois: relative isolate; wrapper interno clipado p/ arte; callouts no mesmo pai
<div className="relative isolate">
  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ...">
    <SilosFigure .../>
  </div>
  {/* callouts aqui (lg:absolute) */}
</div>
```
+ min-h: `lg:min-h-[440px] xl:min-h-[480px]`

### T3 — Principles: contenção
- Arquivo: Principles.jsx
- Mudança: mesma separação (wrapper interno clipado p/ fundo/SVG; callouts fora)
- Risco baixo
- min-h: `lg:min-h-[400px] xl:min-h-[440px]`

### T4 — ThreeWays: contenção + altura + offsets
- Arquivo: ThreeWays.jsx
- Mudança: mesma separação; min-h `lg:min-h-[500px] xl:min-h-[540px]`
- Risco médio-baixo (múltiplos callouts)
- Ajustar top/bottom xl/lg se necessário

### T5 — Examples: contenção + altura
- Arquivo: Examples.jsx
- Mudança: mesma separação; min-h `lg:min-h-[440px] xl:min-h-[480px]`

### T6 — LeaderLine: verificação (sem alterar SVG estrutural)
- Arquivo: LeaderLine.jsx
- Ação: confirmar z-10 coerente; garantir não cortado após T2–T5 (contenção corrigida)
- Mudança opcional: adicionar z-10

## Ordem execução (proposta)
1. T1 (Callout)
2. T2 (Intro)
3. T3 (Principles)
4. T4 (ThreeWays)
5. T5 (Examples)
6. T6 (verificação)

## Critérios verificação
- 1440/1280/1024: 0 overlaps lg:absolute; callouts+LeaderLine completos; sem overflow fora do painel visível
- 768/375: <lg sem absolute intacto
- build OK; 0 console errors; reduced-motion OK; dark theme preservado; textos/imagens inalterados

## Riscos/mitigações
- R1: wrapper interno com overflow-hidden preserva cantos
- R2: testes por breakpoint + ajustes xl/lg
- R3: manter callouts/LeaderLine no mesmo relative pai, overflow-visible
