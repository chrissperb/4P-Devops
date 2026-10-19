import { useReducedMotion } from '../hooks/useReducedMotion';
import { IconFlow, IconFeedback, IconLearning, IconServer, IconRocket, IconChart, IconShield } from './icons';

const NODES = [
  { cx: 150, cy: 170, label: 'Fluxo', Icon: IconFlow, color: '#3b5bff' },
  { cx: 450, cy: 170, label: 'Feedback', Icon: IconFeedback, color: '#f0880a' },
  { cx: 300, cy: 170, label: 'Aprendizado', Icon: IconLearning, color: '#0d9488' },
];

const FLOATERS = [
  { x: 44, y: 46, Icon: IconRocket },
  { x: 516, y: 40, Icon: IconServer },
  { x: 40, y: 268, Icon: IconChart },
  { x: 520, y: 274, Icon: IconShield },
];

export default function DevOpsLoop({ className = '', animated = true, label = 'Ciclo DevOps: fluxo, feedback e aprendizado contínuo' }) {
  const reduce = useReducedMotion();
  const motion = animated && !reduce;
  return (
    <svg viewBox="0 0 600 340" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b5bff" />
          <stop offset="50%" stopColor="#f0880a" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <filter id="loopGlow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="orbGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="5" result="orbBlur" />
          <feMerge>
            <feMergeNode in="orbBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {FLOATERS.map(({ x, y, Icon }, index) => (
        <g key={index} className="text-cream" opacity="0.18">
          <Icon x={x} y={y} width={30} height={30} />
        </g>
      ))}

      <g filter="url(#loopGlow)" opacity="0.5">
        <path
          d="M 150 170 C 150 90 300 90 300 170 C 300 250 450 250 450 170 C 450 90 300 90 300 170 C 300 250 150 250 150 170 Z"
          fill="none"
          stroke="url(#loopGrad)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>

      <path
        id="devops-loop"
        d="M 150 170 C 150 90 300 90 300 170 C 300 250 450 250 450 170 C 450 90 300 90 300 170 C 300 250 150 250 150 170 Z"
        fill="none"
        stroke="url(#loopGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <path
        d="M 150 170 C 150 90 300 90 300 170 C 300 250 450 250 450 170 C 450 90 300 90 300 170 C 300 250 150 250 150 170 Z"
        fill="none"
        stroke="#fbfaf7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        className={motion ? 'animate-dash' : undefined}
        opacity="0.55"
      />

      <circle r="7" fill="#fbfaf7" filter="url(#orbGlow)">
        {motion && (
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#devops-loop" />
          </animateMotion>
        )}
      </circle>

      {NODES.map(({ cx, cy, label, Icon, color }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="42" fill={color} opacity="0.16" />
          <circle cx={cx} cy={cy} r="31" fill="#fbfaf7" />
          <circle cx={cx} cy={cy} r="31" fill="none" stroke={color} strokeWidth="3" />
          <g style={{ color }} stroke={color}>
            <Icon x={cx - 15} y={cy - 15} width={30} height={30} />
          </g>
          <text
            x={cx}
            y={cy + 62}
            textAnchor="middle"
            fill="#f5f5fb"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="18"
            fontWeight="700"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
