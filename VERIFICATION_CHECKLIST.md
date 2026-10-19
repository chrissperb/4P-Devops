# Checklist de Verificação (M4)

## Breakpoints
- [ ] 1440px — sem sobreposições lg:absolute
- [ ] 1280px — sem sobreposições lg:absolute
- [ ] 1024px — sem sobreposições lg:absolute
- [ ] 768px — <lg, sem absolute, layout limpo
- [ ] 375px — <lg, sem absolute, layout limpo

## Conteúdo/Clipping
- [ ] Intro: callouts + LeaderLine completos, sem corte
- [ ] Principles: callouts + LeaderLine completos, sem corte
- [ ] ThreeWays: callouts + LeaderLine completos, sem corte
- [ ] Examples: callouts + LeaderLine completos, sem corte
- [ ] "Textos faltando" eliminados por clipping

## Técnico
- [ ] build OK (npm run build)
- [ ] 0 erros de console (preview)
- [ ] reduced-motion respeitado
- [ ] dark theme preservado
- [ ] textos/imagens inalterados (exceto layout/posicionamento)
- [ ] z-index coerente (callouts/LeaderLine acima arte)
- [ ] mobile <lg sem regressão

## Arquivos verificados
- [ ] Callout.jsx
- [ ] Intro.jsx
- [ ] Principles.jsx
- [ ] ThreeWays.jsx
- [ ] Examples.jsx
- [ ] LeaderLine.jsx
