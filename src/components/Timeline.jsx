import { timeline } from '../data/content';
import { getAccent } from '../lib/accents';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

function EventCard({ event, align }) {
  const accent = getAccent(event.tone);
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-surface-raised p-5 shadow-card transition hover:shadow-lift ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <span className={`chip ${accent.bgSoft} ${accent.text}`}>{event.year}</span>
      <h4 className="mt-3 font-display text-lg font-bold leading-tight text-cream">{event.title}</h4>
      <p className="mt-1.5 text-sm leading-snug text-cream/70">{event.text}</p>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="historia" className="band border-y border-white/10 bg-surface">
      <SectionHeader index="02" eyebrow="História" title={timeline.heading} lead={timeline.lead} tone="violet" />

      <Reveal className="hidden lg:block">
        <div className="relative">
          <span className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-flow via-violet to-learning opacity-40" />
          <ol className="space-y-8">
            {timeline.events.map((event, index) => {
              const accent = getAccent(event.tone);
              const leftCard = index % 2 === 0;
              return (
                <li key={event.year} className="relative grid grid-cols-2 gap-8">
                  <span
                    className={`absolute left-1/2 top-1/2 h-px w-4 -translate-y-1/2 ${
                      leftCard ? '-translate-x-full' : ''
                    } bg-white/15`}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-surface"
                    style={{ backgroundColor: accent.hex }}
                  />
                  {leftCard ? (
                    <>
                      <EventCard event={event} align="right" />
                      <span aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" />
                      <EventCard event={event} align="left" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>

      <Reveal className="lg:hidden">
        <ol className="relative space-y-5 border-l-2 border-white/10 pl-6">
          {timeline.events.map((event) => {
            const accent = getAccent(event.tone);
            return (
              <li key={event.year} className="relative">
                <span
                  className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-surface"
                  style={{ backgroundColor: accent.hex }}
                />
                <div className="rounded-2xl border border-white/10 bg-surface-raised p-4 shadow-card">
                  <span className={`chip ${accent.bgSoft} ${accent.text}`}>{event.year}</span>
                  <h4 className="mt-2 text-base font-bold text-cream">{event.title}</h4>
                  <p className="mt-1 text-sm leading-snug text-cream/70">{event.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
