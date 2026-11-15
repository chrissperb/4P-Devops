# Cultura DevOps e as Três Maneiras — Infográfico Interativo

Infográfico interativo em português sobre a cultura DevOps, seus princípios (CAMS) e as três maneiras (Fluxo, Feedback e Aprendizado Contínuo). Atividade da disciplina **Desenvolvimento de Software e Operações de TI — DevOps (Unidade I)**.

**Autor:** Christian Sperb · Baseado no material de Rafael Barbosa.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Infográfico: hero, intro Silos × Time integrado, história, fundamentos (CAMS), as 3 maneiras, exemplos, quiz |
| `/reflexao/` | Relato de reflexão com palavras-chave destacadas por tema |

> A publicação atual (AWS) serve a SPA na raiz do domínio CloudFront. O endereço antigo do GitHub Pages (`/4P-Devops/`) continua no ar com o build anterior.

## Estudo de caso — arquitetura AWS

Em [`estudo-de-caso/`](estudo-de-caso/estudo-de-caso.md): desenho de arquitetura de redes para um sistema de gerenciamento de eventos (~100 mil chamadas/dia, abrangência local com potencial mundial), com visão global (`arquitetura-global.svg`) e detalhe de VPC por região (`arquitetura-vpc.svg`), além da justificativa em dois parágrafos.

## Atividade III — Infraestrutura como código (CloudFormation)

Em [`atividade-iii-cloudformation/`](atividade-iii-cloudformation/README.md): template único `template.yaml` que provisiona VPC com quatro sub-redes (duas públicas e duas privadas), instância EC2 (Amazon Linux 2023 + nginx), Application Load Balancer e banco RDS MySQL privado, com Security Groups encadeados, IAM para SSM Session Manager e senha gerenciada pelo Secrets Manager. O README traz diagrama, passo a passo pelo console e pela CLI, mapa recurso→linha do template, justificativas e instruções de limpeza.

## Atividade IV — Pipeline CI/CD (GitHub Actions + AWS)

Em [`atividade-iv-cicd/`](atividade-iv-cicd/README.md): pipeline em `.github/workflows/deploy.yml` que valida o build e os templates, cria *change sets* (plan) em pull requests e aplica (apply) na `main` com aprovação manual. O deploy usa CloudFormation (stack da Atividade III) e publica esta SPA em S3 privado + CloudFront com HTTPS. Inclui bootstrap de IAM, bucket de artifacts com criptografia e ciclo de vida, e job de `destroy` para controle de custo.

## Stack

- React 18 + Vite 6
- Tailwind CSS 3.4 (tema escuro semântico)
- Framer Motion (animações, `reducedMotion="user"`)
- SVG autoral (loop animado CAMS/3 maneiras, diagramas, figuras)

## Rodar localmente

```bash
npm install
npm run dev      # dev server
npm run build    # build em dist/ (base /)
npm run preview  # serve o build com base correta
```

## Deploy (AWS via GitHub Actions)

- Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — pull request gera plano; push em `main` aplica após aprovação do environment `production`; `workflow_dispatch` permite `apply`/`destroy`.
- IaC: CloudFormation. A stack da Atividade III (`devops-iii-dev`) e a stack da SPA (`devops-iv-spa`) são aplicadas pelo pipeline.
- SPA: bucket S3 privado + CloudFront (OAC, HTTPS). Build MPA (`index.html` + `reflexao/index.html`) com base `/`.
- Artefatos e planos: `s3://$ARTIFACTS_BUCKET/runs/<run_id>/` e artifacts do Actions.
- Autenticação: Secrets `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` (usuário restrito a `sts:AssumeRole`) + `AWS_ROLE_ARN`/`AWS_ROLE_EXTERNAL_ID`. OIDC está bloqueado por SCP nesta conta.
- Passo a passo completo, custos e troubleshooting: [`atividade-iv-cicd/README.md`](atividade-iv-cicd/README.md).
- O site antigo do GitHub Pages permanece publicado com o build anterior em `/4P-Devops/`.

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
