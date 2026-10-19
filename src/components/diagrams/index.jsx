import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  IconLightbulb,
  IconCode,
  IconBug,
  IconRocket,
  IconServer,
  IconRadar,
  IconBell,
  IconWrench,
  IconBook,
  IconFlask,
  IconChart,
  IconBrain,
  IconTrendUp,
  IconSharing,
  IconArrowRight,
} from '../icons';

const toneText = {
  flow: 'text-flow-bright',
  feedback: 'text-feedback-bright',
  learning: 'text-learning-bright',
};

const toneSoft = {
  flow: 'bg-flow-soft',
  feedback: 'bg-feedback-soft',
  learning: 'bg-learning-soft',
};

function PipelineDiagram() {
  const stages = [
    { label: 'Ideia', Icon: IconLightbulb, tone: 'flow' },
    { label: 'Dev', Icon: IconCode, tone: 'flow' },
    { label: 'Teste', Icon: IconBug, tone: 'feedback', bottleneck: true },
    { label: 'Deploy', Icon: IconRocket, tone: 'learning' },
    { label: 'Prod', Icon: IconServer, tone: 'learning' },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-x-5 top-7 h-0.5 bg-gradient-to-r from-flow via-feedback to-learning opacity-30" />
        <motion.span
          className="absolute top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_0_4px_rgba(109,74,255,0.18)]"
          animate={{ left: ['6%', '94%'] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <div className="relative flex items-start justify-between">
          {stages.map((stage) => (
            <div key={stage.label} className="flex w-1/5 flex-col items-center gap-2.5">
              <div
                className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-surface-raised shadow-card ring-2 ring-white/10 sm:h-14 sm:w-14 ${toneText[stage.tone]}`}
              >
                <stage.Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                {stage.bottleneck && (
                  <span className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 animate-pulseSoft rounded-full bg-coral ring-2 ring-surface-raised" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-cream/70 sm:text-xs">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-xs font-medium text-cream/55">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-coral align-middle" />
        O gargalo (restrição) limita a velocidade de todo o fluxo.
      </p>
    </div>
  );
}

function FeedbackDiagram() {
  const nodes = [
    { label: 'Detectar', Icon: IconRadar, pos: 'left-1/2 top-0 -translate-x-1/2' },
    { label: 'Alertar', Icon: IconBell, pos: 'right-0 top-1/2 -translate-y-1/2' },
    { label: 'Agir', Icon: IconWrench, pos: 'left-1/2 bottom-0 -translate-x-1/2' },
    { label: 'Aprender', Icon: IconBook, pos: 'left-0 top-1/2 -translate-y-1/2' },
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-64 w-64 sm:h-72 sm:w-72">
        <div className="absolute inset-2 animate-spinSlow rounded-full border-2 border-dashed border-feedback/40" />
        <div className="absolute inset-10 animate-spinSlower rounded-full border border-feedback/20 [animation-direction:reverse]" />

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-feedback-soft text-center text-feedback shadow-card sm:h-28 sm:w-28">
          <IconFeedbackGlyph />
          <span className="mt-1 font-display text-sm font-bold">Feedback</span>
        </div>

        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + index * 0.12, duration: 0.4 }}
            className={`absolute ${node.pos} flex flex-col items-center gap-1`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-raised text-feedback-bright shadow-card ring-2 ring-white/10">
              <node.Icon className="h-5 w-5" />
            </span>
            <span className="rounded-full bg-surface-raised/90 px-2 py-0.5 text-[11px] font-semibold text-cream/70">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-center text-xs font-medium text-cream/55">
        Ciclo curto e contínuo: quanto mais rápido, mais cedo o problema é corrigido.
      </p>
    </div>
  );
}

function IconFeedbackGlyph() {
  return (
    <span className="grid h-8 w-8 place-items-center">
      <IconArrowRight className="h-5 w-5 -scale-x-100" />
    </span>
  );
}

function LearningDiagram() {
  const steps = [
    { label: 'Experimentar', Icon: IconFlask },
    { label: 'Medir', Icon: IconChart },
    { label: 'Aprender', Icon: IconBrain },
    { label: 'Melhorar', Icon: IconTrendUp },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-end sm:justify-between sm:gap-1.5">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              style={{ minHeight: `${92 + index * 20}px` }}
              className={`flex min-w-0 flex-col justify-end gap-2 rounded-2xl border border-white/10 p-3 sm:flex-1 ${
                index % 2 === 0 ? 'bg-learning-soft' : 'bg-surface-raised'
              }`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-raised text-learning-bright shadow-card">
                <step.Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold text-cream/70 sm:text-xs">{step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <IconArrowRight className="mb-6 hidden h-4 w-4 shrink-0 text-learning/60 sm:block sm:h-5 sm:w-5" />
            )}
          </Fragment>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-violet/40 bg-violet-soft/60 p-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-soft text-violet-bright">
          <IconSharing className="h-5 w-5" />
        </span>
        <p className="text-xs font-medium leading-snug text-cream/70 sm:text-sm">
          <span className="font-semibold text-cream">Compartilhar:</span> a descoberta local vira melhoria global para
          toda a organização.
        </p>
      </div>
    </div>
  );
}

export default function WayDiagram({ type }) {
  if (type === 'pipeline') return <PipelineDiagram />;
  if (type === 'feedback') return <FeedbackDiagram />;
  if (type === 'learning') return <LearningDiagram />;
  return null;
}
