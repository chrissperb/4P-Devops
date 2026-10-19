export const navLinks = [
  { id: 'intro', label: 'Introdução' },
  { id: 'principios', label: 'Princípios' },
  { id: 'maneiras', label: 'As 3 Maneiras' },
  { id: 'exemplos', label: 'Exemplos' },
  { id: 'quiz', label: 'Quiz' },
];

export const hero = {
  author: 'Christian Sperb',
  kicker: 'Desenvolvimento de Software e Operações de TI · DevOps · Unidade I',
  titleLead: 'Cultura',
  titleAccent: 'DevOps',
  titleTail: 'e as Três Maneiras',
  subtitle:
    'Como desenvolvimento e operações deixaram de lado o "muro da confusão" para entregar valor com mais velocidade, confiabilidade e aprendizado contínuo.',
  pills: [
    { key: 'flow', label: 'Fluxo' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'learning', label: 'Aprendizado contínuo' },
  ],
  stats: [
    { value: '3', label: 'maneiras' },
    { value: 'CAMS', label: 'princípios' },
    { value: '1', label: 'cultura' },
  ],
};

export const intro = {
  heading: 'De silos a um fluxo único',
  lead: 'Durante anos, desenvolvimento (Dev) e operações (Ops) perseguiram objetivos diferentes. A velocidade de entrega de um lado contra a estabilidade do ambiente do outro. O resultado eram filas, retrabalho e o famoso "muro da confusão" (wall of confusion).',
  sides: [
    {
      tag: 'Dev',
      color: 'flow',
      goal: 'Velocidade',
      text: 'Criar e entregar novas funcionalidades o mais rápido possível.',
    },
    {
      tag: 'Ops',
      color: 'learning',
      goal: 'Estabilidade',
      text: 'Manter a produção estável, segura e disponível.',
    },
  ],
  wall: 'muro da confusão',
  definition: {
    title: 'O que é DevOps',
    text: 'DevOps é uma cultura que une pessoas, processos e tecnologia para tornar o desenvolvimento e a operação de sistemas mais ágeis, confiáveis e eficientes. Não é um cargo: é uma responsabilidade compartilhada por toda a organização.',
    points: [
      'Elimina silos organizacionais',
      'Compartilha responsabilidades e objetivos',
      'Aumenta qualidade, velocidade e confiabilidade',
    ],
  },
};

export const principles = {
  heading: 'Princípios fundamentais',
  lead: 'Em 2010, Damon Edwards e John Willis sintetizaram a base da cultura DevOps no acrônimo CAMS. Ele resume o que muda quando Dev e Ops passam a trabalhar juntos.',
  cams: [
    {
      key: 'culture',
      letter: 'C',
      name: 'Culture',
      pt: 'Cultura',
      text: 'Colaboração real entre desenvolvimento, operações, segurança e gestão, com objetivos e responsabilidades compartilhados.',
    },
    {
      key: 'automation',
      letter: 'A',
      name: 'Automation',
      pt: 'Automação',
      text: 'Reduzir trabalho manual com ferramentas e processos automatizados, como CI/CD e infraestrutura como código.',
    },
    {
      key: 'measurement',
      letter: 'M',
      name: 'Measurement',
      pt: 'Medição',
      text: 'Acompanhar métricas para avaliar desempenho, orientar decisões e tornar as melhorias visíveis.',
    },
    {
      key: 'sharing',
      letter: 'S',
      name: 'Sharing',
      pt: 'Compartilhamento',
      text: 'Disseminar conhecimento, experiências e boas práticas entre as equipes e por toda a organização.',
    },
  ],
  roots: [
    { title: 'Agile (2001)', text: 'Indivíduos e interações, software em funcionamento e resposta a mudanças.' },
    { title: 'Lean & TPS', text: 'Eliminação de desperdícios, melhoria contínua e foco no fluxo de valor, herança do Sistema Toyota.' },
    { title: 'Lei de Conway', text: 'O sistema tende a reproduzir a estrutura de comunicação da organização que o constrói.' },
    { title: 'CI/CD', text: 'Integração e entrega contínuas: mudanças pequenas, validadas e previsíveis até a produção.' },
  ],
};

export const threeWays = {
  heading: 'As Três Maneiras',
  lead: 'Popularizadas por Gene Kim em "The Three Ways", elas descrevem os três princípios que sustentam o fluxo de valor. Juntas, formam um ciclo contínuo.',
  ways: [
    {
      id: 'fluxo',
      number: '01',
      name: 'Fluxo',
      tagline: 'Do desenvolvimento às operações',
      accent: 'flow',
      diagram: 'pipeline',
      summary:
        'Acelerar o fluxo de valor reduzindo o tempo entre a solicitação do cliente e a entrega. Menos espera, menos filas e mais valor chegando ao destino.',
      topics: [
        { title: 'Tornar o trabalho visível', text: 'Quadros Kanban mostram o que está em andamento, o que aguarda e o que terminou, facilitando priorizar e localizar gargalos.' },
        { title: 'Limitar o WIP', text: 'Restringir o trabalho em progresso reduz a troca de contexto, aumenta o foco e acelera a conclusão das tarefas já iniciadas.' },
        { title: 'Reduzir o tamanho dos lotes', text: 'O fluxo unitário (single-piece flow) faz o primeiro item ficar pronto mais cedo e gera feedback mais rápido sobre as mudanças.' },
        { title: 'Reduzir transferências', text: 'Cada passagem entre equipes cria filas e perda de contexto. Automação e autonomia encurtam a "última milha" da entrega.' },
        { title: 'Identificar restrições', text: 'Todo fluxo tem um gargalo. Pela Teoria das Restrições, melhorar o ponto limitante é o que aumenta a capacidade do sistema.' },
        { title: 'Eliminar desperdícios', text: 'Trabalho pela metade, espera, defeitos e processos manuais são desperdícios sob a ótica Lean e devem sair do caminho.' },
      ],
      example: {
        title: 'Exemplo prático',
        text: 'Na Amazon, times two-pizza assumem o serviço de ponta a ponta ("you build it, you run it"). O pipeline de CI/CD automatiza build, testes e deploy, então o trabalho flui sem filas entre times.',
      },
    },
    {
      id: 'feedback',
      number: '02',
      name: 'Feedback',
      tagline: 'Da direita para a esquerda',
      accent: 'feedback',
      diagram: 'feedback',
      summary:
        'Falhas são inevitáveis em sistemas complexos. A segunda maneira cria mecanismos para detectar problemas rápido, compartilhar o que se sabe e agir antes que pequenos erros virem incidentes graves.',
      topics: [
        { title: 'Feedback rápido e contínuo', text: 'Detectar desvios cedo, quando ainda são baratos de corrigir, evita que se transformem em falhas graves.' },
        { title: 'Andon cord (o farol)', text: 'Inspirado no Sistema Toyota de Produção: qualquer pessoa pode parar a linha ao detectar um desvio e acionar ajuda imediata.' },
        { title: 'Qualidade na origem', text: 'Quem executa o trabalho também valida a qualidade, com testes automatizados, peer review e testes sob demanda.' },
        { title: 'Otimizar para a próxima etapa', text: 'No Lean, o próximo passo do fluxo é o cliente. Otimizar o próprio trabalho pensando em quem o recebe.' },
      ],
      example: {
        title: 'Exemplo prático',
        text: 'Pipelines com testes automatizados, monitoramento e health checks dão feedback em minutos. O Andon cord do Sistema Toyota de Produção inspira alertas que param o processo antes de o defeito chegar ao cliente.',
      },
    },
    {
      id: 'aprendizado',
      number: '03',
      name: 'Aprendizado contínuo',
      tagline: 'Criar uma cultura de experimentação',
      accent: 'learning',
      diagram: 'learning',
      summary:
        'A terceira maneira cria uma cultura de alta confiança, na qual experimentar e assumir riscos de forma disciplinada e científica acelera o aprendizado e multiplica os efeitos do conhecimento.',
      topics: [
        { title: 'Alta confiança', text: 'Reduzir continuamente os ciclos de feedback torna o ambiente mais seguro para experimentar e assumir riscos calculados.' },
        { title: 'Blameless post-mortem', text: 'Analisar o incidente sem culpar pessoas. Os 3 Rs: Regret (reconhecer), Reason (motivo) e Remedy (remédio com ações SMART).' },
        { title: 'Institucionalizar a melhoria', text: 'Reservar tempo no ciclo para reduzir débito técnico, corrigir defeitos e refatorar. Kaizen Blitzes formalizam essa melhoria.' },
        { title: 'Local vira global', text: 'Transformar a descoberta de um time em melhoria para toda a organização, com post-mortems abertos e repositórios compartilhados.' },
        { title: 'Testes de resiliência', text: 'Game days e chaos engineering injetam falhas em produção para validar como o sistema se recupera antes que o acaso teste por nós.' },
      ],
      example: {
        title: 'Exemplo prático',
        text: 'A Netflix criou o Simian Army: o Chaos Monkey desliga instâncias aleatórias e o Chaos Gorilla simula a queda de uma zona inteira. Em vez de punir, a organização aprende e fortalece o sistema.',
      },
    },
  ],
};

export const examples = {
  heading: 'Exemplos em organizações',
  lead: 'As três maneiras não vivem em slides. Elas aparecem em práticas concretas de empresas de referência.',
  items: [
    {
      org: 'Amazon',
      accent: 'flow',
      tag: 'Fluxo',
      title: 'Two-pizza teams',
      text: 'Times pequenos e autônomos, donos do serviço de ponta a ponta. "You build it, you run it."',
    },
    {
      org: 'Toyota',
      accent: 'feedback',
      tag: 'Feedback',
      title: 'Andon cord & Kaizen',
      text: 'Qualquer pessoa para a linha ao detectar um defeito. Melhoria contínua no chão de fábrica (Gemba).',
    },
    {
      org: 'Netflix',
      accent: 'learning',
      tag: 'Aprendizado',
      title: 'Simian Army',
      text: 'Chaos engineering em produção: Chaos Monkey, Latency Monkey e Chaos Gorilla testam a resiliência continuamente.',
    },
    {
      org: 'Times de produto',
      accent: 'violet',
      tag: 'Todas',
      title: 'Kanban + CI/CD + Post-mortem',
      text: 'Trabalho visível, entrega automatizada e análise sem culpa formam o ciclo completo das três maneiras.',
    },
  ],
};

export const quiz = {
  heading: 'Teste seu entendimento',
  lead: 'Cinco perguntas rápidas sobre a cultura DevOps e as três maneiras.',
  questions: [
    {
      q: 'O acrônimo CAMS reúne quais princípios?',
      options: [
        'Code, Agile, Metrics, Security',
        'Culture, Automation, Measurement, Sharing',
        'Cloud, API, Monitoring, Scale',
        'Continuous, Automated, Managed, Safe',
      ],
      answer: 1,
      explain: 'CAMS = Culture, Automation, Measurement e Sharing.',
    },
    {
      q: 'A primeira maneira (Fluxo) busca principalmente…',
      options: [
        'Punir responsáveis por incidentes',
        'Aumentar o trabalho em andamento (WIP)',
        'Reduzir o tempo entre pedido e entrega de valor',
        'Congelar mudanças em produção',
      ],
      answer: 2,
      explain: 'Fluxo acelera o fluxo de valor, reduzindo espera, filas e gargalos.',
    },
    {
      q: 'A prática de parar a linha ao detectar um desvio vem de qual princípio?',
      options: ['Andon cord (Feedback)', 'Blast radius', 'Two-pizza team', 'Blue-green deploy'],
      answer: 0,
      explain: 'O Andon cord dá feedback rápido e aciona a ajuda imediatamente.',
    },
    {
      q: 'O que caracteriza um blameless post-mortem?',
      options: [
        'Identificar e punir o culpado',
        'Analisar o incidente focando em aprender, sem culpar pessoas',
        'Ocultar detalhes para proteger a equipe',
        'Medir apenas o tempo médio de resolução (MTTR)',
      ],
      answer: 1,
      explain: 'Em sistemas complexos não existe um único culpado. O objetivo é aprender.',
    },
    {
      q: 'Chaos Monkey e Simian Army (Netflix) pertencem a qual maneira?',
      options: ['Fluxo', 'Feedback', 'Aprendizado contínuo e experimentação', 'Nenhuma'],
      answer: 2,
      explain: 'São experimentos controlados que geram aprendizado sobre a resiliência do sistema.',
    },
  ],
};

export const timeline = {
  heading: 'Linha do tempo',
  lead: 'As ideias foram se somando: da linha de montagem ao movimento DevOps.',
  events: [
    { year: '1913', title: 'Linha de montagem', text: 'Henry Ford divide o trabalho em etapas padronizadas e reduz desperdício.', tone: 'flow' },
    { year: '1968', title: 'Lei de Conway', text: 'O sistema reproduz a estrutura de comunicação da organização que o constrói.', tone: 'violet' },
    { year: '1990', title: 'Lean & TPS', text: 'O Sistema Toyota de Produção é apresentado ao Ocidente.', tone: 'learning' },
    { year: '2001', title: 'Manifesto Ágil', text: 'Indivíduos, software funcionando e resposta a mudanças.', tone: 'flow' },
    { year: '2006', title: 'Deployment Production Line', text: 'Entrega de software tratada como fluxo contínuo e automatizado.', tone: 'feedback' },
    { year: '2009', title: 'DevOpsDays Ghent', text: 'Patrick Debois populariza o termo DevOps.', tone: 'violet' },
    { year: '2010', title: 'CAMS', text: 'Edwards e Willis consolidam os princípios da cultura.', tone: 'feedback' },
    { year: '2013', title: 'The Three Ways', text: 'Gene Kim sistematiza fluxo, feedback e aprendizado contínuo.', tone: 'learning' },
  ],
};

export const silos = {
  toggle: { before: 'Antes', after: 'Depois' },
  before: {
    label: 'Silos isolados',
    note: 'Objetivos diferentes, filas e retrabalho.',
    sides: [
      { tag: 'Dev', goal: 'Velocidade', text: 'Entregar funcionalidades rápido.' },
      { tag: 'Ops', goal: 'Estabilidade', text: 'Manter produção de pé.' },
    ],
  },
  after: {
    label: 'Time integrado',
    note: 'Objetivos compartilhados, responsabilidade conjunta.',
    members: ['Dev', 'Ops', 'Segurança', 'Gestão'],
  },
};

export const footer = {
  statement: 'DevOps é uma cultura, não um cargo.',
  note: 'Infográfico desenvolvido como atividade da disciplina Desenvolvimento de Software e Operações de TI — DevOps (Unidade I).',
  credit: 'Christian Sperb · Baseado no material de Rafael Barbosa.',
};

export const reflexao = {
  eyebrow: 'Atividade',
  title: 'Reflexão: DevOps no seu ambiente',
  lead: 'Relato de exemplo sobre como a cultura DevOps e as três maneiras podem ser aplicadas no ambiente de trabalho e em projetos futuros.',
  relato: {
    title: 'Relato de reflexão',
    paragraphs: [
      'Ao longo desta unidade, percebi que **DevOps** não é apenas automatizar deploy ou adotar ferramentas: é uma mudança de **cultura** em que desenvolvimento e operações compartilham objetivos, responsabilidades e aprendizados. Pensar nas **três maneiras** me ajudou a enxergar o próprio trabalho com outros olhos.',
      'No meu ambiente atual — projetos da disciplina, estágio e trabalhos em equipe — os problemas mais comuns lembram o **muro da confusão**: código entregue sem clareza de operação, mudanças de última hora e retrabalho. Aplicar a primeira maneira (**Fluxo**) começaria por enxergar o trabalho como um fluxo contínuo: reduzir filas de tarefas paradas, limitar trabalho em progresso e encurtar o caminho do commit até o usuário. Mesmo sem **pipeline** maduro, pequenas práticas — como checklist de entrega, ramo curto de desenvolvimento e **deploy** pequeno e frequente — já aumentam a velocidade com segurança.',
      'A segunda maneira (**Feedback**) é a que mais sinto falta. Sem feedback rápido, erro só aparece em produção, quando o custo sobe. Incorporar **testes automatizados** simples, monitoramento básico de logs e **revisões de código** frequentes criaria um circuito de feedback curto: o problema é visto perto do ponto em que foi introduzido, e não dias depois.',
      'A terceira maneira (**Aprendizado contínuo**) mudou minha visão sobre falhas. Em vez de procurar culpados, posso tratar incidentes como oportunidades de melhorar o sistema: depois de cada problema, escrever um breve **postmortem** sem culpa, registrando o que aconteceu, o que foi aprendido e o que mudará. Cultura de experimentar com segurança — pequenas mudanças, reversíveis, com **métricas** — é o que transforma aprendizado em melhoria real.',
      'Para **projetos futuros**, meu plano é: mapear o fluxo atual e identificar a maior fila; automatizar build e teste como primeiro passo de pipeline; estabelecer um canal de feedback (testes + logs + revisão) e criar o hábito de retrospectiva e postmortem depois de cada entrega relevante. Ainda que em pequena escala, essas práticas já aproximam o ambiente das três maneiras e de uma cultura DevOps de verdade.',
    ],
  },
  note: 'Relato de exemplo produzido como atividade da disciplina Desenvolvimento de Software e Operações de TI — DevOps (Unidade I).',
};
