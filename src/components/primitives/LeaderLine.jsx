export default function LeaderLine({ dir = 'right', tone = 'violet', className = '' }) {
  const colorClass =
    {
      violet: 'text-violet-bright',
      flow: 'text-flow-bright',
      feedback: 'text-feedback-bright',
      learning: 'text-learning-bright',
    }[tone] || 'text-violet-bright';

  const horizontal = dir === 'left' || dir === 'right';
  const sideClass =
    {
      right: 'left-full top-9',
      left: 'right-full top-9',
      down: 'left-1/2 top-full -translate-x-1/2',
      up: 'left-1/2 bottom-full -translate-x-1/2',
    }[dir] || 'left-full top-9';

  return (
    <svg
      viewBox={horizontal ? '0 0 72 12' : '0 0 12 72'}
      width={horizontal ? 72 : 12}
      height={horizontal ? 12 : 72}
      className={`pointer-events-none absolute hidden lg:block ${sideClass} ${colorClass} z-10 ${className}`}
      aria-hidden="true"
    >
      {horizontal ? (
        <>
          <line x1="7" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.45" />
          <circle cx="6" cy="6" r="3.5" fill="currentColor" />
          <circle cx="64" cy="6" r="3" fill="currentColor" opacity="0.55" />
        </>
      ) : (
        <>
          <line x1="6" y1="7" x2="6" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.45" />
          <circle cx="6" cy="6" r="3.5" fill="currentColor" />
          <circle cx="6" cy="64" r="3" fill="currentColor" opacity="0.55" />
        </>
      )}
    </svg>
  );
}
