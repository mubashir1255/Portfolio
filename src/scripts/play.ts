/**
 * Play mode: an opt-in switch in the nav. Off (the default) the page is plain HTML and CSS.
 * On, it loads the vendored sakuga-vfx files (public/sakuga-vfx, MIT) and adds their effects
 * to native links and buttons marked `data-sakuga`. With reduced motion, nothing is loaded.
 *
 *   data-sakuga="impact"   squash + burst + sound-effect word on click
 *   data-sakuga="done"     the same, then a ✓ (for actions that finish on click, e.g. a download)
 *   data-sakuga-word       the painted word: don (default), shu (secondary buttons), kachi, pon, zuza, gogo
 * Call sakugaDone(el) yourself when an action finishes later (e.g. copy to clipboard).
 */
import { withBase } from '@/lib';

type Pt = { x: number; y: number; w: number; h: number };
type Fx = (x: number, y: number, opts?: Record<string, unknown>) => void;
type Spring = { x: number; v: number; to: number };
type Squash = { s: Spring; pop: Spring; tilt: Spring; step(dt: number): void };

/** The parts of window.SakugaFX (sakuga-vfx core) this site uses. */
export interface SakugaFX {
  P: Record<string, unknown>;
  at(el: Element, fx?: number, fy?: number): Pt;
  squashy(el: HTMLElement, opts?: Record<string, number>): Squash;
  later(ms: number, f: () => void): void;
  sfx(name: string, x: number, y: number, opts?: Record<string, unknown>): void;
  shards: Fx;
  puff: Fx;
  ticks: Fx;
  wob: Fx;
  donut: Fx;
  kira: Fx;
}

declare global {
  interface Window {
    SakugaFX?: SakugaFX;
  }
}

const KEY = 'play-mode';
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set<(on: boolean) => void>();

export const isPlay = () => root.dataset.play === 'on';
/** Effects run only in Play mode, and never with reduced motion. */
export const effectsWanted = () => isPlay() && !reducedMotion.matches;

export function setPlay(on: boolean) {
  if (on) root.dataset.play = 'on';
  else delete root.dataset.play;
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* storage blocked: the choice just won't persist */
  }
  listeners.forEach((f) => f(on));
}

/** Calls `f` now with the current state, and on every change. */
export function onPlayChange(f: (on: boolean) => void) {
  listeners.add(f);
  f(isPlay());
}

// ── Loading the vendored files ──────────────────────────────
const loaded = new Map<string, Promise<void>>();

function loadFile(file: string) {
  let p = loaded.get(file);
  if (!p) {
    p = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = withBase(`sakuga-vfx/${file}`);
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`sakuga-vfx: ${file} failed to load`));
      document.head.append(s);
    });
    loaded.set(file, p);
  }
  return p;
}

/** Ink, paper and electric blue, instead of the library's lavender and pink. */
function theme(fx: SakugaFX) {
  Object.assign(fx.P, {
    fill: '#fffdf8',
    shade: '#d6e4ff',
    line: '#14120f',
    accent: '#0057ff',
    ink: '#14120f',
    sfx: ['#0057ff', '#fffdf8'],
  });
}

/** Loads the given controls (default: button + tabs). Resolves null if anything fails: the native page keeps working. */
export async function loadSakuga(files: string[] = ['button.js', 'tabs.js']): Promise<SakugaFX | null> {
  try {
    await Promise.all(files.map(loadFile));
    const fx = window.SakugaFX ?? null;
    if (fx) theme(fx);
    return fx;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

// ── Effects on native links and buttons ─────────────────────
const wired = new WeakSet<HTMLElement>();

/** Mirrors sakuga-button's impact, applied to a native element so links stay links. */
function wire(fx: SakugaFX, el: HTMLElement) {
  if (wired.has(el)) return;
  wired.add(el);
  const sq = fx.squashy(el, { low: 0.6, wide: 0.24 });

  // Step the springs only while they move.
  let raf = 0;
  let last = 0;
  let until = 0;
  const run = (t: number) => {
    const dt = Math.min((t - last) / 1000, 0.034);
    last = t;
    if (effectsWanted()) sq.step(dt);
    else el.style.transform = '';
    raf = t < until ? requestAnimationFrame(run) : 0;
    if (!raf) el.style.transform = '';
  };
  const kick = (ms = 1400) => {
    until = performance.now() + ms;
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(run);
    }
  };
  el.addEventListener('pointerdown', () => effectsWanted() && kick());

  el.addEventListener('click', () => {
    if (!effectsWanted()) return;
    const c = fx.at(el);
    sq.s.x = Math.min(sq.s.x, 0.6);
    sq.pop.x = 1.2;
    sq.tilt.x = -4;
    el.classList.add('is-impact');
    fx.later(190, () => el.classList.remove('is-impact'));
    fx.shards(c.x, c.y, { n: 11, speed: 260, size: 9, life: 0.95, arc: 6.28, grav: 300 });
    for (const [dx, dy] of [[-1, -0.5], [1, -1], [-1, 0.9], [1, 1]]) {
      fx.puff(c.x + dx * (c.w / 2 + 6), c.y + dy * 22, { size: 13, n: 5, vx: dx * 46, vy: dy * 30 - 6, life: 0.9 });
    }
    const word = el.dataset.sakugaWord ?? (el.classList.contains('btn--secondary') ? 'shu' : 'don');
    fx.sfx(word, c.x + 10, c.y - 70, { size: word === 'don' ? 140 : 110, rot: -0.12, life: 1 });
    fx.later(200, () => {
      sq.s.x = 1.18;
      fx.wob(c.x - c.w / 2 - 8, c.y, { dir: -1 });
      fx.wob(c.x + c.w / 2 + 8, c.y, { dir: 1 });
      fx.donut(c.x + 6, c.y - 40, { r: 24, vx: 22, vy: -52, life: 1.1 });
    });
    kick();
    if (el.dataset.sakuga === 'done') fx.later(450, () => done(fx, el));
  });
}

/** Lands the ✓ on an element whose action just finished. Does nothing outside Play mode. */
export function sakugaDone(el: HTMLElement) {
  const fx = window.SakugaFX;
  if (fx && effectsWanted()) done(fx, el);
}

/** sakuga-button's done(): a check with a glint. */
function done(fx: SakugaFX, el: HTMLElement) {
  const q = fx.at(el, 1, 0);
  el.classList.add('is-done');
  fx.kira(q.x - 16, q.y + 2, { r: 15, life: 1 });
  fx.ticks(q.x - 2, q.y - 12, { dir: -0.8, n: 2, r: 6, len: 12 });
  setTimeout(() => el.classList.remove('is-done'), 1800);
}

// ── The switch ──────────────────────────────────────────────
export function initPlay() {
  const toggle = document.getElementById('play-toggle') as HTMLButtonElement | null;
  if (toggle) {
    toggle.hidden = false; // without JS the switch would do nothing, so it starts hidden
    toggle.addEventListener('click', () => setPlay(!isPlay()));
  }
  onPlayChange(async (on) => {
    toggle?.setAttribute('aria-checked', String(on));
    if (!effectsWanted()) return;
    const fx = await loadSakuga();
    if (!fx) return;
    document.querySelectorAll<HTMLElement>('[data-sakuga]').forEach((el) => wire(fx, el));
  });
}
