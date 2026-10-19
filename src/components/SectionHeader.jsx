import { getAccent } from '../lib/accents';

export default function SectionHeader({ index, eyebrow, title, lead, tone = 'violet', dark = false, className = '' }) {
  const accent = getAccent(tone);
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-3">
        <span className={`num-display text-4xl opacity-30 sm:text-5xl ${dark ? 'text-cream' : accent.text}`}>
          {index}
        </span>
        <span className={`eyebrow ${dark ? 'text-cream/50' : 'text-cream/55'}`}>{eyebrow}</span>
        <span className={`h-px flex-1 ${dark ? 'bg-cream/15' : 'bg-white/10'}`} />
      </div>
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? 'text-cream' : 'text-cream'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-3 max-w-3xl text-lg leading-relaxed ${dark ? 'text-cream/70' : 'text-cream/70'}`}>{lead}</p>
      )}
    </div>
  );
}
