import { getAccent } from '../lib/accents';

export default function SectionHeader({ index, eyebrow, title, lead, tone = 'violet', dark = false, className = '' }) {
  const accent = getAccent(tone);
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-3">
        <span className={`num-display text-4xl opacity-30 sm:text-5xl ${dark ? 'text-text' : accent.text}`}>
          {index}
        </span>
        <span className="eyebrow text-text-subtle">{eyebrow}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-text-muted">{lead}</p>
      )}
    </div>
  );
}
