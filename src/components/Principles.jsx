import { principles } from '../data/content';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Plate from './primitives/Plate';
import Callout from './primitives/Callout';
import CamsFigure from './figures/CamsFigure';
import { IconCulture, IconAutomation, IconMeasurement, IconSharing } from './icons';

const camsMeta = {
  culture: { accent: 'violet', Icon: IconCulture, pos: 'tl' },
  automation: { accent: 'flow', Icon: IconAutomation, pos: 'tr' },
  measurement: { accent: 'feedback', Icon: IconMeasurement, pos: 'bl' },
  sharing: { accent: 'learning', Icon: IconSharing, pos: 'br' },
};

export default function Principles() {
  return (
    <section id="principios" className="band bg-violet-soft/50">
      <SectionHeader index="03" eyebrow="Fundamentos" title={principles.heading} lead={principles.lead} tone="violet" />

      <Plate labelledById="cams-art" caption="CAMS reúne o que muda quando desenvolvimento e operações trabalham juntos.">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-6">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-surface-raised">
            <div className="mx-auto w-full max-w-[560px] px-6 py-10 lg:py-12">
              <CamsFigure labelledById="cams-art" className="mx-auto w-full" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {principles.cams.map((item) => {
              const { accent, Icon } = camsMeta[item.key];
              return (
                <Callout key={item.key} tone={accent} icon={Icon} eyebrow={item.pt} title={item.name} connector={false} maxW="">
                  {item.text}
                </Callout>
              );
            })}
          </div>
        </div>
      </Plate>

      <Reveal delay={0.1} className="mt-8">
        <h3 className="eyebrow mb-4 text-cream/55">Raízes</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.roots.map((root) => (
            <div key={root.title} className="rounded-2xl border border-dashed border-violet/30 bg-white/5 p-4">
              <h4 className="eyebrow text-violet-bright">{root.title}</h4>
              <p className="mt-2 text-sm leading-snug text-cream/70">{root.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
