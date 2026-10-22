# Cultura DevOps e as Três Maneiras — Infográfico Interativo

Infográfico interativo em português sobre a cultura DevOps, seus princípios (CAMS) e as três maneiras (Fluxo, Feedback e Aprendizado Contínuo). Atividade da disciplina **Desenvolvimento de Software e Operações de TI — DevOps (Unidade I)**.

**Autor:** Christian Sperb · Baseado no material de Rafael Barbosa.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/4P-Devops/` | Infográfico: hero, intro Silos × Time integrado, história, fundamentos (CAMS), as 3 maneiras, exemplos, quiz |
| `/4P-Devops/reflexao/` | Relato de reflexão com palavras-chave destacadas por tema |

## Estudo de caso — arquitetura AWS

Em [`estudo-de-caso/`](estudo-de-caso/estudo-de-caso.md): desenho de arquitetura de redes para um sistema de gerenciamento de eventos (~100 mil chamadas/dia, abrangência local com potencial mundial), com visão global (`arquitetura-global.svg`) e detalhe de VPC por região (`arquitetura-vpc.svg`), além da justificativa em dois parágrafos.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3.4 (tema escuro semântico)
- Framer Motion (animações, `reducedMotion="user"`)
- SVG autoral (loop animado CAMS/3 maneiras, diagramas, figuras)

## Rodar localmente

```bash
npm install
npm run dev      # dev server
npm run build    # build em dist/ (base /4P-Devops/)
npm run preview  # serve o build com base correta
```

## Deploy (GitHub Pages)

- Workflow: `.github/workflows/deploy.yml` (push em `main`, ou manual via *workflow_dispatch*).
- Build multi-página (MPA): `index.html` + `reflexao/index.html`.
- Base path: `/4P-Devops/` — o repositório no GitHub deve se chamar `4P-Devops`.

## Estrutura

```
src/
  components/       # seções (Hero, Intro, Principles, ThreeWays, Examples, Quiz…)
  components/figures/   # figuras SVG anotadas (silos, CAMS, org map)
  components/primitives/  # Plate, Callout, LeaderLine
  data/content.js   # todos os textos em PT-BR
  lib/accents.js    # paleta semântica (flow/feedback/learning/violet)
reflexao/index.html # entrada da página de reflexão
```
