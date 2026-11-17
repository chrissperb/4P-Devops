import { useState } from 'react';
import { getTheme, persistTheme, toggleTheme } from '../lib/theme';
import { IconMoon, IconSun } from './icons';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getTheme);
  const isLight = theme === 'light';

  // O ícone indica o tema de destino: sol quando o clique leva ao claro.
  const Icon = isLight ? IconMoon : IconSun;

  function handleClick() {
    const next = toggleTheme();
    persistTheme(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      aria-label="Tema claro"
      aria-pressed={isLight}
      onClick={handleClick}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-fill-subtle text-text transition hover:border-border-strong hover:bg-fill-strong ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
