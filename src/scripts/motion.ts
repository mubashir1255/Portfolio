/**
 * Entrance motion with anime.js v4, part of Play mode.
 *
 * - Runs only in Play mode and never with prefers-reduced-motion.
 * - anime.js is loaded on the visitor's first interaction (move, touch, scroll, key), not at page load.
 * - Only content still below the fold is hidden for its entrance; what's on screen at load is
 *   left alone, and without JavaScript nothing is ever hidden.
 * - Transforms only (no layout changes), and inline styles are cleared when each entrance ends,
 *   so CSS tilts and hover lifts keep working.
 * - Switching Play mode off mid-page reveals anything still waiting.
 */
import { isPlay, onPlayChange, whenEngaged } from './play';

type Anime = typeof import('./anime-lite');

interface Group {
  root: Element;
  targets: HTMLElement[];
  hide(a: Anime): void;
  show(a: Anime): void;
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pending = new Set<Group>();
let anime: Anime | null = null;
let observer: IntersectionObserver | null = null;
let started = false;

const inView = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0;
};

/** Clears the inline styles anime.js left behind, handing control back to the stylesheet. */
const release = (els: Element[]) =>
  els.forEach((el) => {
    (el as HTMLElement).style.removeProperty('opacity');
    (el as HTMLElement).style.removeProperty('transform');
  });

function collect(): Group[] {
  const groups: Group[] = [];
  const all = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T & HTMLElement>(sel)];

  // Chapter headings: the number springs up, the title slides in, the rule draws from the left.
  for (const root of all('.chapter-head')) {
    const num = root.querySelector<HTMLElement>('.chapter-head__num')!;
    const text = root.querySelector<HTMLElement>(':scope > div')!;
    const rule = root.querySelector<HTMLElement>('.chapter-head__rule')!;
    groups.push({
      root,
      targets: [num, text, rule],
      hide: ({ utils }) => {
        utils.set(num, { opacity: 0, translateY: 48, rotate: -12, scale: 0.55 });
        utils.set(text, { opacity: 0, translateX: -28 });
        utils.set(rule, { scaleX: 0 });
      },
      show: ({ animate }) => {
        animate(num, { opacity: 1, translateY: 0, rotate: 0, scale: 1, duration: 900, ease: 'outElastic(1, .55)', onComplete: () => release([num]) });
        animate(text, { opacity: 1, translateX: 0, delay: 120, duration: 520, ease: 'out(3)', onComplete: () => release([text]) });
        animate(rule, { scaleX: 1, delay: 60, duration: 750, ease: 'inOut(3)', onComplete: () => release([rule]) });
      },
    });
  }

  // Lists of panels (experience, project cards, skill groups, contact): rise in with a stagger.
  const lists = ['#experience ol', '[data-project-group] > ol', '[data-project-group] > ul', '#skills ul.grid', '#contact .grid'];
  for (const root of lists.flatMap((sel) => all(sel))) {
    const items = [...root.children] as HTMLElement[];
    groups.push({
      root,
      targets: items,
      hide: ({ utils }) => utils.set(items, { opacity: 0, translateY: 36 }),
      show: ({ animate, stagger }) =>
        animate(items, { opacity: 1, translateY: 0, delay: stagger(90), duration: 650, ease: 'out(4)', onComplete: () => release(items) }),
    });
  }

  // Skill chips: pop in one after another inside each group.
  for (const root of all('#skills ul.grid > li')) {
    const chips = all('.chip', root);
    groups.push({
      root,
      targets: chips,
      hide: ({ utils }) => utils.set(chips, { opacity: 0, scale: 0.4 }),
      show: ({ animate, stagger }) =>
        animate(chips, { opacity: 1, scale: 1, delay: stagger(45, { start: 250 }), duration: 520, ease: 'outBack(2)', onComplete: () => release(chips) }),
    });
  }

  // Journey: each episode slides in from the right and its dot pops on the timeline.
  for (const root of all('.timeline__item')) {
    const dot = root.querySelector<HTMLElement>('.timeline__dot')!;
    const card = root.querySelector<HTMLElement>('.panel')!;
    groups.push({
      root,
      targets: [dot, card],
      hide: ({ utils }) => {
        utils.set(card, { opacity: 0, translateX: 48 });
        utils.set(dot, { scale: 0 });
      },
      show: ({ animate }) => {
        animate(dot, { scale: 1, duration: 600, ease: 'outBack(3)', onComplete: () => release([dot]) });
        animate(card, { opacity: 1, translateX: 0, delay: 90, duration: 620, ease: 'out(4)', onComplete: () => release([card]) });
      },
    });
  }

  return groups;
}

async function start() {
  if (started || reducedMotion.matches || !isPlay()) return;
  started = true;
  await whenEngaged();
  if (!isPlay()) {
    started = false;
    return;
  }
  try {
    anime = await import('./anime-lite');
  } catch {
    return; // motion is optional
  }
  const a = anime;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const g of pending) {
          if (g.root === entry.target) {
            pending.delete(g);
            observer!.unobserve(g.root);
            g.show(a);
          }
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  for (const g of collect()) {
    if (inView(g.root)) continue; // already on screen: leave it as it is
    g.hide(a);
    pending.add(g);
    observer.observe(g.root);
  }
}

/** Play mode switched off: show everything still waiting, stop observing. */
function stop() {
  observer?.disconnect();
  for (const g of pending) release(g.targets);
  pending.clear();
  started = false;
}

export function initMotion() {
  onPlayChange((on) => (on ? start() : stop()));
}
