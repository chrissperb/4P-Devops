import { motion } from 'framer-motion';
import { hero, threeWays } from '../data/content';
import { getAccent } from '../lib/accents';
import DevOpsLoop from './DevOpsLoop';
import { IconFlow, IconFeedback, IconLearning, IconArrowRight, IconSpark } from './icons';

const wayIcon = { fluxo: IconFlow, feedback: IconFeedback, aprendizado: IconLearning };

const reflexaoHref = `${import.meta.env.BASE_URL}reflexao/`;

function KickerRow() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="eyebrow flex items-center gap-2 text-cream/60">
          <IconSpark className="h-3.5 w-3.5 text-violet" />
          {hero.kicker}
        </span>
        <span className="flex items-center gap-3">
          {hero.pills.map((pill) => {
            const accent = getAccent(pill.key);
            return (
              <span key={pill.key} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-cream/60">
                <span className={`h-2.5 w-2.5 rounded-full ${accent.bg}`} />
                {pill.label}
              </span>
            );
          })}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-cream/55">
          Por <span className="font-semibold text-cream/85">{hero.author}</span>
        </p>
        <a
          href={reflexaoHref}
          className="group inline-flex items-center gap-2 rounded-full border border-violet/45 bg-violet/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream/90 transition hover:border-violet hover:bg-violet/25"
        >
          Reflexão
          <IconArrowRight className="h-3.5 w-3.5 text-violet transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function TitleCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-ink/75 p-6 shadow-lift backdrop-blur-md md:p-7">
      <h1 className="font-display text-3xl font-bold leading-[1.03] tracking-tight sm:text-4xl lg:text-[2.6rem]">
        {hero.titleLead}{' '}
        <span className="relative inline-block text-cream">
          {hero.titleAccent}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-0.5 left-0 -z-10 h-3 w-full origin-left rounded-full bg-violet/60"
          />
        </span>{' '}
        <span className="text-cream/55">{hero.titleTail}</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-cream/70">{hero.subtitle}</p>
      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
        {hero.stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="font-display text-2xl font-bold tracking-tight md:text-3xl">{stat.value}</span>
              <span className="ml-2 text-xs font-medium text-cream/50">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function WayCard({ way, delay = 0 }) {
  const accent = getAccent(way.accent);
  const Icon = wayIcon[way.id];
  return (
    <motion.a
      href="#maneiras"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block rounded-3xl border border-white/10 bg-ink/75 p-5 backdrop-blur-md transition hover:border-white/25 hover:bg-ink/85"
    >
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 ${accent.text}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <span className="num-display block text-xs text-cream/45">{way.number}</span>
          <h3 className="font-display text-lg font-bold leading-tight">{way.name}</h3>
        </div>
        <IconArrowRight className="ml-auto h-4 w-4 shrink-0 text-cream/40 transition group-hover:translate-x-1" />
      </div>
      <p className="mt-3 text-sm leading-snug text-cream/65">{way.tagline}</p>
    </motion.a>
  );
}

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-ink px-6 pb-8 pt-12 text-cream sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet/25 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-flow/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-learning/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[1120px]">
        <KickerRow />

        <div className="mt-8 hidden lg:block">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <TitleCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <DevOpsLoop className="mx-auto w-full max-w-[600px]" />
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {threeWays.ways.map((way, index) => (
              <WayCard key={way.id} way={way} delay={0.15 + index * 0.1} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:hidden">
          <TitleCard />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <DevOpsLoop className="mx-auto w-full max-w-[540px]" />
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-3">
            {threeWays.ways.map((way, index) => (
              <WayCard key={way.id} way={way} delay={0.1 + index * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
