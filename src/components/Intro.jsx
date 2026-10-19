import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { intro, silos } from '../data/content';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Plate from './primitives/Plate';
import Callout from './primitives/Callout';
import SilosFigure from './figures/SilosFigure';
import { IconCheck, IconSharing, IconCode, IconServer } from './icons';

export default function Intro() {
  const [mode, setMode] = useState('before');
  const isBefore = mode === 'before';

  return (
    <section id="intro" className="band bg-surface-raised bg-grid">
      <SectionHeader index="01" eyebrow="Contexto" title={intro.heading} lead={intro.lead} tone="flow" />

      <Reveal>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full border border-white/15 bg-surface p-1">
            {[
              { key: 'before', label: silos.toggle.before },
              { key: 'after', label: silos.toggle.after },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setMode(option.key)}
                className={`cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold transition ${
                  mode === option.key ? 'bg-ink text-cream' : 'text-cream/70 hover:text-cream'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-cream/55">{isBefore ? silos.before.note : silos.after.note}</p>
        </div>
      </Reveal>

      <Plate
        labelledById="intro-art"
        caption={isBefore ? 'Objetivos opostos geram filas, retrabalho e o famoso "muro da confusão".' : 'Objetivos compartilhados substituem o conflito pela colaboração.'}
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-6">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-flow-soft/60 via-transparent to-learning-soft/60">
            <div className="mx-auto w-full max-w-[560px] px-6 py-10 lg:py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <SilosFigure mode={mode} labelledById="intro-art" className="w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {isBefore ? (
              silos.before.sides.map((side) => (
                <Callout
                  key={side.tag}
                  tone={side.tag === 'Dev' ? 'flow' : 'learning'}
                  icon={side.tag === 'Dev' ? IconCode : IconServer}
                  eyebrow={side.goal}
                  title={side.tag}
                  connector={false}
                  maxW=""
                >
                  {side.text}
                </Callout>
              ))
            ) : (
              <Callout tone="violet" icon={IconSharing} eyebrow="Depois" title="Time integrado" connector={false} maxW="">
                {silos.after.note}
              </Callout>
            )}
          </div>
        </div>
      </Plate>

      <Reveal delay={0.1} className="mt-8">
        <div className="relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-white/10 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <span className="chip bg-violet-soft text-violet">
                <IconSharing className="mr-1.5 h-3.5 w-3.5" />
                Definição
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">{intro.definition.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-cream/70">{intro.definition.text}</p>
            </div>
            <ul className="space-y-2.5">
              {intro.definition.points.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-learning/15 text-learning-bright">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-cream/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
