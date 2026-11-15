---
type: Decision
title: Atividade III — privacidade do RDS e HTTPS condicional
description: Decisão de corrigir a segmentação do RDS agora e preparar HTTPS sem domínio, mantendo HTTP no deploy atual.
status: accepted
tags: [aws, cloudformation, atividade-iii, decisao]
generated:
  by: human:helena-duarte
  at: 2026-11-13T00:00:00Z
---

# Decisão

- O RDS passa a usar sub-redes privadas em duas AZs, com route table sem rota
  para o Internet Gateway.
- Não será criado NAT Gateway; a EC2 permanece pública para `dnf` e SSM.
- O ALB recebe listener HTTPS 443 condicional, ativado somente quando
  `CertificateArn` e `DomainName` forem informados.
- Sem domínio, o deploy atual continua em HTTP:80 e a limitação fica
  documentada.

# Alternativas descartadas

- **CloudFront na frente do ALB como solução final:** entrega HTTPS ao usuário,
  mas o trecho CloudFront → ALB continua HTTP. Não resolve HTTPS no ALB.
- **Certificado self-signed:** gera aviso no navegador e exige gestão de chave
  privada; não é adequado para produção.
- **NAT Gateway agora:** custo desnecessário; o RDS não inicia tráfego para a
  internet.

# Consequências

- A mudança no RDS pode aparecer como substituição da `DBInstance` no change
  set. Em `dev`, sem dados, é aceitável; com dados, snapshot manual antes.
- O template fica pronto para HTTPS assim que houver domínio e certificado ACM.
- A documentação deve deixar claro que HTTP:80 é limitação do ambiente atual,
  não solução de produção.
