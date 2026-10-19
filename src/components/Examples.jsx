import { examples } from '../data/content';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import Plate from './primitives/Plate';
import Callout from './primitives/Callout';
import OrgMapFigure from './figures/OrgMapFigure';
import { IconServer, IconWrench, IconFlask, IconSharing } from './icons';

const ORG_META = {
  Amazon: { pos: 'tl', Icon: IconServer },
  Toyota: { pos: 'tr', Icon: IconWrench },
  Netflix: { pos: 'br', Icon: IconFlask },
  'Times de produto': { pos: 'bl', Icon: IconSharing },
};

export default function Examples() {
  return (
    <section id="exemplos" className="band bg-surface">
      <SectionHeader index="05" eyebrow="Na prática" title={examples.heading} lead={examples.lead} tone="feedback" />

      <Plate labelledById="orgmap-art" caption="Empresas de setores diferentes aplicam os mesmos princípios em práticas concretas.">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-6">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-surface-raised">
            <div className="mx-auto w-full max-w-[560px] px-6 py-10 lg:py-12">
              <OrgMapFigure labelledById="orgmap-art" className="mx-auto w-full" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {examples.items.map((item) => {
              const meta = ORG_META[item.org];
              return (
                <Callout key={item.org} tone={item.tone} icon={meta.Icon} eyebrow={item.org} title={item.practice} connector={false} maxW="">
                  {item.text}
                </Callout>
              );
            })}
          </div>
        </div>
      </Plate>
    </section>
  );
}
