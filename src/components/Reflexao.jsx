import { motion } from 'framer-motion';
import { hero, reflexao } from '../data/content';
import { getAccent } from '../lib/accents';
import { IconArrowLeft, IconSpark } from './icons';

const backHref = import.meta.env.BASE_URL;

const KEYWORD_ACCENTS = [
  { test: /fluxo/i, accent: 'flow' },
  { test: /feedback/i, accent: 'feedback' },
  { test: /aprendizado/i, accent: 'learning' },
  { test: /devops|muro da confusão|pipeline|deploy|postmortem|cultura|três maneiras|projetos futuros|testes automatizados|revisões de código|métricas/i, accent: 'violet' },
];

function highlight(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (!part.startsWith('**')) return part;
    const word = part.slice(2, -2);
    const match = KEYWORD_ACCENTS.find((entry) => entry.test.test(word));
    const accent = getAccent(match ? match.accent : 'violet');
    return (
      <strong key={index} className={`font-semibold ${accent.text}`}>
        {word}
      </strong>
    );
  });
}

export default function Reflexao() {
  return (
    <div className="relative overflow-hidden bg-ink px-6 py-12 text-cream sm:px-8 md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-flow/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[860px]">
        <a
          href={backHref}
          className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream/60 transition hover:text-cream"
        >
          <IconArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
          Voltar ao infográfico
        </a>

        <span className="eyebrow flex items-center gap-2 text-cream/60">
          <IconSpark className="h-3.5 w-3.5 text-violet" />
          {reflexao.eyebrow} · Unidade I
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl"
        >
          {reflexao.title}
        </motion.h1>

        <p className="mt-4 max-w-[640px] text-base leading-relaxed text-cream/70">{reflexao.lead}</p>

        <p className="mt-4 text-xs font-medium text-cream/55">
          Por <span className="font-semibold text-cream/85">{hero.author}</span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-3xl border border-white/10 bg-ink/75 p-6 backdrop-blur-md md:p-8"
        >
          <h2 className="font-display text-xl font-bold tracking-tight">{reflexao.relato.title}</h2>
          {reflexao.relato.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">
              {highlight(paragraph)}
            </p>
          ))}
        </motion.div>

        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-cream/55">{reflexao.note}</p>

        <a
          href={backHref}
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-violet/45 bg-violet/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cream/90 transition hover:border-violet hover:bg-violet/25"
        >
          <IconArrowLeft className="h-3.5 w-3.5 text-violet transition group-hover:-translate-x-0.5" />
          Voltar ao infográfico
        </a>
      </div>
    </div>
  );
}
