const SATELLITES = [
  { angle: -90, label: ['Amazon'], color: '#3b5bff' },
  { angle: 0, label: ['Toyota'], color: '#f0880a' },
  { angle: 90, label: ['Netflix'], color: '#0d9488' },
  { angle: 180, label: ['Times de', 'produto'], color: '#6d4aff' },
];

export default function OrgMapFigure({ className = '', labelledById }) {
  const cx = 280;
  const cy = 210;
  const r = 122;

  const nodes = SATELLITES.map((s) => {
    const rad = (s.angle * Math.PI) / 180;
    return { ...s, x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
  });

  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-labelledby={labelledById} aria-label="Práticas DevOps em organizações: Amazon, Toyota, Netflix e times de produto ligadas pela mesma cultura">
      {nodes.map((node) => (
        <line key={node.label[0]} x1={cx} y1={cy} x2={node.x} y2={node.y} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.18" />
      ))}

      <circle cx={cx} cy={cy} r="60" fill="#20203c" />
      <circle cx={cx} cy={cy} r="60" fill="none" stroke="#b3a0ff" strokeWidth="3" opacity="0.7" />
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#f5f5fb" fontFamily="'Space Grotesk', sans-serif" fontSize="21" fontWeight="700">
        DevOps
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#f5f5fb" fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="600" opacity="0.7">
        cultura comum
      </text>

      {nodes.map((node) => (
        <g key={node.label.join(' ')}>
          <circle cx={node.x} cy={node.y} r="46" fill={node.color} opacity="0.13" />
          <circle cx={node.x} cy={node.y} r="38" fill="#20203c" />
          <circle cx={node.x} cy={node.y} r="38" fill="none" stroke={node.color} strokeWidth="3" />
          {node.label.map((line, index) => (
            <text
              key={line}
              x={node.x}
              y={node.y + (node.label.length === 1 ? 5 : index === 0 ? -3 : 15)}
              textAnchor="middle"
              fill={node.color === '#6d4aff' ? '#b3a0ff' : node.color === '#3b5bff' ? '#93a8ff' : node.color === '#f0880a' ? '#f6b755' : '#4fd6c4'}
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="14"
              fontWeight="700"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
