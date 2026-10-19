/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { DEFAULT: '#0b0b16', soft: '#15152a', mute: '#1e1e38' },
        cream: '#f5f5fb',
        surface: { DEFAULT: '#12121f', raised: '#1b1b30', sunken: '#0d0d1a' },
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
