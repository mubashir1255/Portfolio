/**
 * Page motion on top of the book (src/scripts/book.ts), built with anime.js v4:
 *  - ambient dot grid that ripples out from the spine on every page turn (and on clicks)
 *  - cover title letters drop in on springs, then do an occasional jump wave
 *  - items on a newly revealed page fade up in sequence, like ink settling
 *  - stats count up the first time the About page is seen
 * Reduced-motion visitors get instant page changes and no ambient motion.
 */
import { animate, createTimer, splitText, spring, stagger, utils } from 'animejs';
import { initBook } from './book';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ── Mobile menu ── */
function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  const set = (open: boolean) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.querySelector('.icon-open')?.classList.toggle('hidden', open);
    toggle.querySelector('.icon-close')?.classList.toggle('hidden', !open);
    if (open && !reduced) {
      animate($('[data-menu-items] > *', menu), { opacity: [0, 1], x: [-12, 0], delay: stagger(35), duration: 350, ease: 'outQuad' });
    }
  };
  toggle.addEventListener('click', () => set(menu.classList.contains('hidden')));
  $('[data-close-menu]', menu).forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
}

/* ── Dot grid ── */
function initDotGrid() {
  const grid = document.getElementById('dot-grid');
  if (!grid) return () => {};
  let cols = 0;
  let rows = 0;
  let dots: HTMLElement[] = [];

  const build = () => {
    const cell = window.innerWidth < 640 ? 30 : 38;
    cols = Math.min(48, Math.ceil(window.innerWidth / cell));
    rows = Math.min(30, Math.ceil(window.innerHeight / cell));
    grid.style.setProperty('--cols', String(cols));
    grid.style.setProperty('--rows', String(rows));
    grid.replaceChildren(...Array.from({ length: cols * rows }, () => document.createElement('span')));
    dots = $('span', grid);
  };
  build();
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(build, 200);
  });

  animate(dots, {
    opacity: [0, 1],
    scale: [0, 1],
    delay: stagger(18, { grid: [cols, rows], from: 'center' }),
    duration: 500,
    ease: 'outBack',
  });

  let busy = false;
  const ripple = (x: number, y: number) => {
    if (busy || !dots.length) return;
    busy = true;
    const c = utils.clamp(Math.floor((x / window.innerWidth) * cols), 0, cols - 1);
    const r = utils.clamp(Math.floor((y / window.innerHeight) * rows), 0, rows - 1);
    animate(dots, {
      scale: [{ to: 2.4, duration: 220, ease: 'outQuad' }, { to: 1, duration: 800, ease: 'outElastic(1, .5)' }],
      backgroundColor: [{ to: '#ff7d3f', duration: 220 }, { to: 'rgba(243,234,216,0.14)', duration: 800 }],
      delay: stagger(32, { grid: [cols, rows], from: r * cols + c }),
      onComplete: () => (busy = false),
    });
  };

  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest('#book, header, a, button, .book-controls')) return;
    ripple(e.clientX, e.clientY);
  });
  return ripple;
}

/* ── Cover title: spring drop + occasional jump wave ── */
function initCoverTitle() {
  const title = document.getElementById('cover-title');
  if (!title) return;
  const { chars } = splitText(title, { chars: true });
  animate(chars, {
    opacity: [0, 1],
    y: ['-1.4em', 0],
    rotate: () => [utils.random(-35, 35), 0],
    delay: stagger(70, { from: 'center', start: 250 }),
    ease: spring({ bounce: 0.5, duration: 900 }),
  });
  const wave = () => {
    if (!title.closest('.book-slot')) return; // only while the cover is showing
    animate(chars, {
      y: [{ to: '-0.25em', duration: 240, ease: 'outQuad' }, { to: 0, duration: 650, ease: 'outBounce' }],
      delay: stagger(55),
    });
  };
  createTimer({ duration: 5200, loop: true, delay: 3000, onLoop: () => !document.hidden && wave() });
}

/* ── Ink settling on newly revealed pages ── */
function reveal(pages: HTMLElement[]) {
  if (reduced) return;
  const items = pages.flatMap((p) => $('[data-a]', p));
  if (!items.length) return;
  animate(items, {
    opacity: [0, 1],
    y: [10, 0],
    delay: stagger(45, { start: 180 }),
    duration: 600,
    ease: 'outQuad',
  });
}

/* ── Counters ── */
const counted = new WeakSet<Element>();
function count(pages: HTMLElement[]) {
  pages.forEach((p) =>
    $('[data-count]', p).forEach((el) => {
      if (counted.has(el)) return;
      counted.add(el);
      if (reduced) return;
      const o = { v: 0 };
      animate(o, {
        v: Number(el.dataset.count),
        duration: 1600,
        delay: 300,
        ease: 'outExpo',
        modifier: utils.round(0),
        onUpdate: () => (el.textContent = String(o.v)),
      });
    }),
  );
}

initMenu();
const ripple = reduced ? () => {} : initDotGrid();
if (!reduced) initCoverTitle();
initBook(reduced, {
  onReveal: reveal,
  onTurn: (x, y) => ripple(x, y),
  onSettle: count,
});
