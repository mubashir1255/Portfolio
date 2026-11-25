/** Prefix a public-folder path with the deploy base (e.g. /Portfolio on GitHub Pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * True for content still waiting to be written (empty, or starting with "TODO").
 * Placeholders stay in src/data (grep "TODO:") but never reach the page; real content shows up automatically.
 */
export const isTodo = (s?: string | null): boolean => !s || /^\s*TODO\b/i.test(s);

/** Drops a trailing "TODO: ..." note from otherwise finished text. */
export const stripTodo = (s: string): string => s.replace(/\s*TODO\b.*$/s, '').trim();
