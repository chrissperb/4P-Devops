/** @type {import('tailwindcss').Config} */

// Tokens semânticos vivem em `src/index.css` como canais RGB (`--c-<token>`),
// o que permite os modificadores de alpha do Tailwind (`bg-canvas/80`).
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

// Tokens cujo alpha já faz parte do papel (glass, textos secundários, hairlines
// e fills) não aceitam modificador de alpha; o valor final vem do CSS.
const literal = (name) => `var(--c-${name})`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Legado mapeado por papel na T3 (`ink` -> band/glass, `cream` -> text).
        ink: { DEFAULT: '#0b0b16', soft: '#15152a', mute: '#1e1e38' },
        cream: '#f5f5fb',
        canvas: token('canvas'),
        surface: {
          DEFAULT: token('surface'),
          raised: token('surface-raised'),
          sunken: token('surface-sunken'),
        },
        band: token('band'),
        glass: literal('glass'),
        text: {
          DEFAULT: token('text'),
          muted: literal('text-muted'),
          subtle: literal('text-subtle'),
        },
        hairline: literal('hairline'),
        'border-strong': literal('border-strong'),
        fill: { subtle: literal('fill-subtle'), strong: literal('fill-strong') },
        'on-contrast': token('on-contrast'),
        focus: token('focus'),
        'coral-deep': token('coral-deep'),
        fig: {
          surface: token('fig-surface'),
          text: token('fig-text'),
          'text-muted': token('fig-text-muted'),
          line: literal('fig-line'),
          'node-face': token('fig-node-face'),
          'danger-soft': token('fig-danger-soft'),
          'danger-text': token('fig-danger-text'),
        },
        flow: { DEFAULT: '#3b5bff', soft: '#1c2350', deep: '#1e33b8', bright: '#93a8ff' },
        feedback: { DEFAULT: '#f0880a', soft: '#3a2a0f', deep: '#b3600a', bright: '#f6b755' },
        learning: { DEFAULT: '#0d9488', soft: '#0e332f', deep: '#0a6b62', bright: '#4fd6c4' },
        violet: { DEFAULT: '#6d4aff', soft: '#241b4a', deep: '#4a2fd6', bright: '#b3a0ff' },
        coral: '#ff6b8a'
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,20,43,0.04), 0 12px 32px -14px rgba(20,20,43,0.20)',
        lift: '0 10px 44px -14px rgba(20,20,43,0.30)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(4deg)' },
        },
        dash: {
          to: { strokeDashoffset: '-1000' },
        },
        pulseSoft: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        dash: 'dash 30s linear infinite',
        spinSlow: 'spin 22s linear infinite',
        spinSlower: 'spin 40s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
