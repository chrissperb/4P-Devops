export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME = 'dark';

export const isTheme = (value) => value === 'light' || value === 'dark';

/** Preferência salva, apenas se estiver na whitelist `light|dark`. */
export function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    // localStorage indisponível (modo privado, iframe, política): sem preferência.
    return null;
  }
}

/** Persiste a escolha; falha de storage não invalida o tema da sessão. */
export function persistTheme(theme) {
  if (!isTheme(theme)) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem persistência; o tema aplicado no DOM continua valendo.
  }
}

/** Tema efetivo no DOM (aplicado pelo script inline anti-FOUC ou pelo toggle). */
export function getTheme() {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : DEFAULT_THEME;
}

/** Aplica o tema no <html> e no `color-scheme`; valor inválido cai em dark. */
export function applyTheme(theme) {
  const next = isTheme(theme) ? theme : DEFAULT_THEME;
  const root = document.documentElement;
  root.dataset.theme = next;
  root.style.colorScheme = next;
  return next;
}

/** Alterna a partir do DOM e devolve o novo tema (sem persistir). */
export function toggleTheme() {
  return applyTheme(getTheme() === 'light' ? 'dark' : 'light');
}

/** Tema inicial: preferência válida > `data-theme` já presente > dark. */
export function initTheme() {
  return applyTheme(readStoredTheme() ?? getTheme());
}
