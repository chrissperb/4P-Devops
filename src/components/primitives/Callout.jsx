import { getAccent } from '../../lib/accents';
import LeaderLine from './LeaderLine';

const posClass = {
  tl: 'lg:absolute lg:left-0 lg:top-6',
  tr: 'lg:absolute lg:right-0 lg:top-6',
  bl: 'lg:absolute lg:left-0 lg:bottom-6',
  br: 'lg:absolute lg:right-0 lg:bottom-6',
  t: 'lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-6',
  b: 'lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-6',
};

const connByPos = { tl: 'right', tr: 'left', bl: 'right', br: 'left', t: 'down', b: 'up' };

export default function Callout({
  pos,
  tone = 'violet',
  icon: Icon,
  title,
  eyebrow,
  children,
  variant = 'light',
  className = '',
  connector = true,
  maxW = 'lg:max-w-[300px]',
}) {
  const accent = getAccent(tone);
  const dark = variant === 'dark';

  return (
    <div
      className={`relative w-full rounded-3xl p-5 ${maxW} ${pos ? posClass[pos] : ''} z-10 ${
        dark
          ? 'border border-white/10 bg-ink/75 text-cream shadow-lift backdrop-blur-md'
          : 'border border-white/10 bg-surface-raised/95 shadow-card backdrop-blur'
      } ${className}`}
    >
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
              dark ? 'bg-white/10' : accent.bgSoft
            } ${accent.text}`}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && <span className={`eyebrow block ${dark ? 'text-cream/50' : 'text-cream/55'}`}>{eyebrow}</span>}
          <h3 className={`font-display text-base font-bold leading-tight ${dark ? 'text-cream' : 'text-cream'}`}>
            {title}
          </h3>
        </div>
      </div>
      {children && (
        <div className={`mt-3 text-sm leading-relaxed ${dark ? 'text-cream/70' : 'text-cream/70'}`}>{children}</div>
      )}
      {connector && (
        <LeaderLine dir={connByPos[pos] ?? 'right'} tone={tone} className="hidden lg:block" />
      )}
    </div>
  );
}
