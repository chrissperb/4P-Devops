import { Fragment } from 'react';
import { threeWays } from '../data/content';
import { getAccent } from '../lib/accents';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Plate from './primitives/Plate';
import Callout from './primitives/Callout';
import DevOpsLoop from './DevOpsLoop';
import WayDiagram from './diagrams';
import { IconArrowRight, IconSpark } from './icons';

function WayOverview({ way }) {
  const accent = getAccent(way.accent);
  return (
    <Callout
      tone={way.accent}
      eyebrow={`Maneira ${way.number}`}
      title={way.name}
      connector={false}
      maxW=""
    >
      <p className={`text-xs font-semibold ${accent.text}`}>{way.tagline}</p>
      <p className="mt-1.5">{way.summary}</p>
      <a
        href={`#way-${way.id}`}
        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${accent.text}`}
      >
        Detalhes
        <IconArrowRight className="h-3.5 w-3.5" />
      </a>
    </Callout>
  );
}

function Connector({ label, tone }) {
  const accent = getAccent(tone);
  return (
    <div className="flex items-center justify-center gap-3 bg-surface py-5">
      <span className={`h-px w-10 ${accent.bg} opacity-30 sm:w-16`} />
      <IconArrowRight className={`h-4 w-4 ${accent.text}`} />
      <span className="eyebrow text-cream/55">{label}</span>
    </div>
  );
}

function WayBand({ way }) {
  const accent = getAccent(way.accent);
  return (
    <div id={`way-${way.id}`} className={`band ${accent.bgSoft}`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <div className="flex items-center gap-4">
            <span className={`num-display grid h-14 w-14 place-items-center rounded-2xl ${accent.bg} text-xl text-white`}>
              {way.number}
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{way.name}</h3>
              <p className={`text-sm font-semibold ${accent.text}`}>{way.tagline}</p>
            </div>
          </div>

          <p className="mt-5 leading-relaxed text-cream/70">{way.summary}</p>

          <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {way.topics.map((topic, index) => (
              <li key={topic.title} className="flex gap-3">
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${accent.bg}`}
                >
                  {index + 1}
                </span>
                <p className="text-sm leading-snug text-cream/70">
                  <span className="font-semibold text-cream">{topic.title}. </span>
                  {topic.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="rounded-3xl border border-white/10 bg-surface-raised p-5 sm:p-7">
            <WayDiagram type={way.diagram} />
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <IconSpark className={`mt-0.5 h-5 w-5 shrink-0 ${accent.text}`} />
            <div>
              <p className={`text-sm font-bold ${accent.text}`}>{way.example.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-cream/70">{way.example.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreeWays() {
  return (
    <>
      <section id="maneiras" className="band bg-surface-raised">
        <SectionHeader index="04" eyebrow="The Three Ways" title={threeWays.heading} lead={threeWays.lead} tone="learning" />
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {threeWays.ways.map((way, index) => {
              const accent = getAccent(way.accent);
              return (
                <Fragment key={way.id}>
                  <span className={`inline-flex items-center gap-2 rounded-full ${accent.bgSoft} px-4 py-2`}>
                    <span className={`num-display text-sm ${accent.text}`}>{way.number}</span>
                    <span className="text-sm font-bold text-cream">{way.name}</span>
                  </span>
                  {index < threeWays.ways.length - 1 && <IconArrowRight className="h-4 w-4 text-cream/55" />}
                </Fragment>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Plate labelledById="threeways-art" caption="As três maneiras formam um ciclo contínuo: fluxo, feedback e aprendizado.">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-flow-soft/40 via-transparent to-learning-soft/40">
              <div className="mx-auto w-full max-w-[560px] px-6 py-10 lg:py-12">
                <DevOpsLoop className="w-full" label="Ciclo das três maneiras: fluxo, feedback e aprendizado contínuo" />
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {threeWays.ways.map((way) => (
                <WayOverview key={way.id} way={way} />
              ))}
            </div>
          </Plate>
        </Reveal>
      </section>

      <Connector label="Feedback acelera o fluxo" tone="feedback" />
      <WayBand way={threeWays.ways[0]} />

      <Connector label="Aprendizado fecha o ciclo" tone="learning" />
      <WayBand way={threeWays.ways[1]} />

      <Connector label="Local vira global" tone="violet" />
      <WayBand way={threeWays.ways[2]} />
    </>
  );
}
