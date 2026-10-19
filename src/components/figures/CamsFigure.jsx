const QUADRANTS = [
  { d: 'M150 210 A130 130 0 0 1 280 80', color: '#6d4aff' }, // C (left->top)
  { d: 'M280 80 A130 130 0 0 1 410 210', color: '#3b5bff' }, // A (top->right)
  { d: 'M410 210 A130 130 0 0 1 280 340', color: '#f0880a' }, // M (right->bottom)
  { d: 'M280 340 A130 130 0 0 1 150 210', color: '#0d9488' }, // S (bottom->left)
];

const NODES = [
  { x: 280, y: 80, letter: 'C', color: '#6d4aff' },
  { x: 410, y: 210, letter: 'A', color: '#3b5bff' },
  { x: 280, y: 340, letter: 'M', color: '#f0880a' },
  { x: 150, y: 210, letter: 'S', color: '#0d9488' },
];

export default function CamsFigure({ className = '', labelledById }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-labelledby={labelledById} aria-label="Bússola CAMS: Culture, Automation, Measurement e Sharing">
      <circle cx="280" cy="210" r="166" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.18" />
      <circle cx="280" cy="210" r="150" fill="#ffffff" opacity="0.06" />

      {QUADRANTS.map((q) => (
        <path key={q.d} d={q.d} fill="none" stroke={q.color} strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      ))}

      <circle cx="280" cy="210" r="70" fill="#20203c" stroke="#b3a0ff" strokeWidth="1.5" />
      <text x="280" y="203" textAnchor="middle" fill="#f5f5fb" fontFamily="'Space Grotesk', sans-serif" fontSize="30" fontWeight="700" letterSpacing="2">
        CAMS
      </text>
      <text x="280" y="227" textAnchor="middle" fill="#f5f5fb" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" opacity="0.7">
        2010 · Edwards &amp; Willis
      </text>

      {NODES.map((node) => (
        <g key={node.letter}>
          <circle cx={node.x} cy={node.y} r="38" fill={node.color} opacity="0.14" />
          <circle cx={node.x} cy={node.y} r="30" fill="#20203c" />
          <circle cx={node.x} cy={node.y} r="30" fill="none" stroke={node.color} strokeWidth="3" />
          <text x={node.x} y={node.y + 11} textAnchor="middle" fill={`#93a8ff`} fontFamily="'Space Grotesk', sans-serif" fontSize="28" fontWeight="700" style={{ fill: node.color === '#6d4aff' ? '#b3a0ff' : node.color === '#3b5bff' ? '#93a8ff' : node.color === '#f0880a' ? '#f6b755' : '#4fd6c4' }}>
            {node.letter}
          </text>
        </g>
      ))}
    </svg>
  );
}
