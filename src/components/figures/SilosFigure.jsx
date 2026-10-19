import { IconCode, IconServer, IconSharing } from '../icons';

function Label({ x, y, children, fill = '#14142b', size = 22, weight = 700 }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={fill} fontFamily="'Space Grotesk', sans-serif" fontSize={size} fontWeight={weight}>
      {children}
    </text>
  );
}

function Sub({ x, y, children, fill = '#6f6f92', size = 13 }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={fill} fontFamily="Inter, sans-serif" fontSize={size} fontWeight={600}>
      {children}
    </text>
  );
}

export default function SilosFigure({ mode = 'before', className = '', labelledById }) {
  const label =
    mode === 'before'
      ? 'Antes: times de desenvolvimento e operações separados pelo muro da confusão'
      : 'Depois: desenvolvimento, operações, segurança e gestão em um time integrado';

  return (
    <svg viewBox="0 0 560 340" className={className} role="img" aria-labelledby={labelledById} aria-label={label}>
      {mode === 'before' ? (
        <g>
          <rect x="30" y="70" width="190" height="200" rx="22" fill="#1c2350" stroke="#3b5bff" strokeWidth="2.5" />
          <rect x="340" y="70" width="190" height="200" rx="22" fill="#0e332f" stroke="#0d9488" strokeWidth="2.5" />

          <g style={{ color: '#3b5bff' }} stroke="#3b5bff">
            <IconCode x={107} y={98} width={36} height={36} />
          </g>
          <g style={{ color: '#0d9488' }} stroke="#0d9488">
            <IconServer x={417} y={98} width={36} height={36} />
          </g>

          <Label x={125} y={190} fill="#f5f5fb">Dev</Label>
          <Sub x={125} y={214} fill="#c7c7dd">Velocidade</Sub>
          <Label x={435} y={190} fill="#f5f5fb">Ops</Label>
          <Sub x={435} y={214} fill="#c7c7dd">Estabilidade</Sub>

          <line x1="280" y1="52" x2="280" y2="288" stroke="#ff6b8a" strokeWidth="3" strokeDasharray="9 10" />
          <path d="M262 120 l36 36 M298 120 l-36 36" stroke="#ff6b8a" strokeWidth="3" strokeLinecap="round" />
          <path d="M262 208 l36 36 M298 208 l-36 36" stroke="#ff6b8a" strokeWidth="3" strokeLinecap="round" opacity="0.55" />

          <rect x="196" y="14" width="168" height="30" rx="15" fill="#3a1f2a" />
          <text x="280" y="34" textAnchor="middle" fill="#ff9db2" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="700">
            muro da confusão
          </text>
        </g>
      ) : (
        <g>
          <rect x="60" y="60" width="440" height="220" rx="30" fill="#241b4a" stroke="#6d4aff" strokeWidth="2.5" />
          <g style={{ color: '#b3a0ff' }} stroke="#b3a0ff">
            <IconSharing x={262} y={78} width={36} height={36} />
          </g>
          <Label x={280} y={140} fill="#f5f5fb">Time integrado</Label>
          <Sub x={280} y={160} fill="#c7c7dd">objetivos e responsabilidades compartilhados</Sub>

          {[
            { x: 118, t: 'Dev' },
            { x: 226, t: 'Ops' },
            { x: 334, t: 'Segurança' },
            { x: 442, t: 'Gestão' },
          ].map((chip) => (
            <g key={chip.t}>
              <rect x={chip.x - 50} y="200" width="100" height="46" rx="15" fill="#1b1b30" stroke="#b3a0ff" strokeWidth="1.5" />
              <text x={chip.x} y="229" textAnchor="middle" fill="#b3a0ff" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="700">
                {chip.t}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
