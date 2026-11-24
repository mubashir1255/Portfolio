/**
 * All page motion, built on anime.js v4.
 *  - Hero: stagger-grid ripples (from centre, from clicks, and on an idle loop)
 *    plus spring-bounced name letters that keep doing a jump/squash wave.
 *  - Sections: scrambled eyebrows, split-letter headings, self-drawing accent
 *    lines, spring-staggered cards, counting stats, a scroll-synced journey rail.
 * Everything is skipped when the user prefers reduced motion.
 */
import {
  animate,
  createTimeline,
  createDrawable,
  createTimer,
  onScroll,
  scrambleText,
  splitText,
  spring,
  stagger,
  utils,
} from 'animejs';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Run `fn` once when `el` scrolls into view. */
function whenVisible(el: Element, fn: () => void, margin = '0px 0px -12% 0px') {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { rootMargin: margin },
  );
  io.observe(el);
}

/* ─────────────────────────────── Mobile menu ─────────────────────────────── */
// Not motion, but it must work with or without reduced motion.
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
      animate(menu, { opacity: [0, 1], y: [-12, 0], duration: 350, ease: 'outExpo' });
      animate($('[data-menu-items] > *', menu), {
        opacity: [0, 1],
        x: [-16, 0],
        delay: stagger(40),
        duration: 400,
        ease: 'outExpo',
      });
    }
  };
  toggle.addEventListener('click', () => set(menu.classList.contains('hidden')));
  $('[data-close-menu]', menu).forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
}

/* ───────────────────────────── Skill filter tabs ─────────────────────────── */
function initSkillFilter() {
  const tabs = $<HTMLButtonElement>('[data-filter]');
  const cards = $('[data-category]');
  let busy = false;

  tabs.forEach((tab) =>
    tab.addEventListener('click', async () => {
      if (busy || tab.getAttribute('aria-pressed') === 'true') return;
      busy = true;
      tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
      const id = tab.dataset.filter!;
      const show = cards.filter((c) => id === 'all' || c.dataset.category === id);

      if (!reduced) {
        const visible = cards.filter((c) => !c.classList.contains('hidden'));
        await animate(visible, {
          opacity: 0,
          scale: 0.92,
          y: 12,
          duration: 220,
          delay: stagger(25),
          ease: 'inQuad',
        });
      }
      cards.forEach((c) => c.classList.toggle('hidden', !show.includes(c)));
      if (!reduced) {
        animate(show, {
          opacity: [0, 1],
          scale: [0.9, 1],
          y: [24, 0],
          delay: stagger(70),
          ease: spring({ bounce: 0.35, duration: 600 }),
        });
        animate(show.flatMap((s) => $('.skill-badge', s)), {
          opacity: [0, 1],
          x: [-8, 0],
          delay: stagger(18, { start: 150 }),
          duration: 400,
          ease: 'outQuad',
        });
      }
      busy = false;
    }),
  );
}

/* ──────────────────────────────── Hero grid ──────────────────────────────── */
function initDotGrid() {
  const hero = document.getElementById('hero');
  const grid = document.getElementById('dot-grid');
  if (!hero || !grid) return;

  // Size the grid to the viewport, capped so phones stay smooth.
  const cell = window.innerWidth < 640 ? 34 : 42;
  const cols = Math.min(36, Math.ceil(hero.clientWidth / cell));
  const rows = Math.min(24, Math.ceil(hero.clientHeight / cell));
  grid.style.setProperty('--cols', String(cols));
  grid.style.setProperty('--rows', String(rows));
  const frag = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) frag.appendChild(document.createElement('span'));
  grid.appendChild(frag);
  const dots = $('span', grid);

  let rippling = false;
  const ripple = (from: number | 'center') => {
    if (rippling) return;
    rippling = true;
    createTimeline({ onComplete: () => (rippling = false) })
      .add(dots, {
        scale: [{ to: 2.6, duration: 260, ease: 'outQuad' }, { to: 1, duration: 900, ease: 'outElastic(1, .5)' }],
        opacity: [{ to: 1, duration: 260 }, { to: 0.35, duration: 900 }],
        backgroundColor: [{ to: '#22d3ee', duration: 260 }, { to: 'rgba(96,165,250,0.35)', duration: 900 }],
        delay: stagger(55, { grid: [cols, rows], from }),
      });
  };

  // Intro: dots bloom out from the centre.
  animate(dots, {
    opacity: [0, 0.35],
    scale: [0, 1],
    delay: stagger(40, { grid: [cols, rows], from: 'center' }),
    duration: 600,
    ease: 'outBack',
  });

  // Click anywhere in the hero (except controls) to ripple from that point.
  hero.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a, button')) return;
    const r = grid.getBoundingClientRect();
    const c = utils.clamp(Math.floor(((e.clientX - r.left) / r.width) * cols), 0, cols - 1);
    const rw = utils.clamp(Math.floor(((e.clientY - r.top) / r.height) * rows), 0, rows - 1);
    ripple(rw * cols + c);
  });

  // Idle loop: a ripple from a random dot every few seconds, paused off-screen.
  let onScreen = true;
  new IntersectionObserver(([e]) => (onScreen = e.isIntersecting)).observe(hero);
  createTimer({
    duration: 4200,
    loop: true,
    delay: 2600,
    onLoop: () => onScreen && !document.hidden && ripple(utils.random(0, dots.length - 1)),
  });
}

/* ──────────────────────────────── Hero text ──────────────────────────────── */
function initHero() {
  const title = document.getElementById('hero-title');
  const eyebrow = document.querySelector<HTMLElement>('[data-scramble-hero]');
  if (!title || !eyebrow) return;

  const { chars } = splitText(title, { chars: { class: 'split-char' } });
  const nameChars = chars.filter((c: HTMLElement) => c.closest('.text-gradient'));
  // Each gradient letter needs its own gradient slice so the colour sweep survives the split.
  const nameEl = title.querySelector<HTMLElement>('.text-gradient')!;
  nameEl.classList.remove('text-gradient');
  nameChars.forEach((c: HTMLElement, i: number) => {
    c.classList.add('text-gradient', 'bg-gradient-to-r', 'from-blue-500', 'via-cyan-400', 'to-blue-300');
    c.style.backgroundSize = `${nameChars.length * 100}% 100%`;
    c.style.backgroundPosition = `${(i / Math.max(1, nameChars.length - 1)) * 100}% 0`;
  });
  const lead = chars.filter((c: HTMLElement) => !nameChars.includes(c));

  const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    .set(chars, { opacity: 0 })
    .set(eyebrow, { opacity: 0 })
    .set('[data-hero]', { opacity: 1 })
    .add('header[data-hero]', { y: [-30, 0], opacity: [0, 1], duration: 900 }, 0)
    .add(eyebrow, { opacity: [0, 1], duration: 300 }, 100)
    .add(eyebrow, { innerHTML: scrambleText({ chars: 'uppercase' }), duration: 900 }, 100)
    .add(lead, { opacity: [0, 1], y: ['0.6em', 0], delay: stagger(28), duration: 700 }, 250)
    // Signature move: name letters fall from above and land on springs.
    .add(
      nameChars,
      {
        opacity: [0, 1],
        y: ['-1.6em', 0],
        rotate: () => [utils.random(-40, 40), 0],
        scale: [{ from: 0.4, to: 1 }],
        delay: stagger(70, { from: 'center' }),
        ease: spring({ bounce: 0.55, duration: 900 }),
      },
      450,
    )
    .add('[data-hero-fade]', {
      opacity: [0, 1],
      y: [20, 0],
      delay: stagger(120),
      duration: 900,
    }, 900)
    .add($('[data-hero-pop] > *'), {
      opacity: [0, 1],
      scale: [0.6, 1],
      y: [16, 0],
      delay: stagger(30, { from: 'center' }),
      ease: spring({ bounce: 0.4, duration: 700 }),
    }, 1100);

  // Then the name keeps "breathing": a jump + squash wave every few seconds.
  tl.then(() => {
    const wave = () =>
      animate(nameChars, {
        y: [{ to: '-0.35em', duration: 260, ease: 'outQuad' }, { to: 0, duration: 700, ease: 'outBounce' }],
        scaleY: [{ to: 1.12, duration: 260 }, { to: 0.86, duration: 120 }, { to: 1, duration: 500, ease: 'outElastic(1, .4)' }],
        scaleX: [{ to: 0.92, duration: 260 }, { to: 1.12, duration: 120 }, { to: 1, duration: 500, ease: 'outElastic(1, .4)' }],
        delay: stagger(60),
      });
    createTimer({ duration: 5000, loop: true, onLoop: () => !document.hidden && wave() });
    title.addEventListener('mouseenter', wave);
  });
}

/* ───────────────────────────── Section reveals ───────────────────────────── */
function initHeadings() {
  $('[data-heading]').forEach((h) => {
    const eyebrow = h.querySelector<HTMLElement>('[data-scramble]');
    const line = h.querySelector('[data-draw]');
    h.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => el.removeAttribute('data-split'));
    const title = h.querySelector('h2')!;
    const { chars } = prepSplit(title);
    utils.set(chars, { opacity: 0 });
    utils.set(title, { opacity: 1 });
    const drawable = line ? createDrawable(line) : null;
    if (drawable) utils.set(drawable, { draw: '0.5 0.5', opacity: 1 });
    whenVisible(h, () => {
      const tl = createTimeline({ defaults: { ease: 'outExpo' } });
      if (eyebrow)
        tl.add(eyebrow, { opacity: [0, 1], duration: 200 }, 0).add(
          eyebrow,
          { innerHTML: scrambleText({ chars: 'uppercase' }), duration: 800 },
          0,
        );
      tl.add(chars, {
        opacity: [0, 1],
        y: ['0.8em', 0],
        rotate: [12, 0],
        delay: stagger(22),
        duration: 800,
      }, 120);
      if (drawable) tl.add(drawable, { draw: ['0.5 0.5', '0 1'], duration: 900, ease: 'inOutQuart' }, 300);
    });
  });

  // Standalone split headings (Projects, Journey).
  $('[data-split]').forEach((el) => {
    const { chars } = prepSplit(el);
    utils.set(chars, { opacity: 0 });
    utils.set(el, { opacity: 1 });
    whenVisible(el, () =>
      animate(chars, {
        opacity: [0, 1],
        y: ['0.8em', 0],
        rotate: [12, 0],
        delay: stagger(22),
        duration: 800,
        ease: 'outExpo',
      }),
    );
  });
}

/** Split an h2 into chars; give gradient words per-letter gradient slices so the split doesn't break them. */
function prepSplit(el: HTMLElement) {
  const grad = el.querySelector<HTMLElement>('.text-gradient');
  const gradClasses = grad ? Array.from(grad.classList).filter((c) => /^(text-gradient|bg-gradient|from-|via-|to-)/.test(c)) : [];
  const split = splitText(el, { chars: { class: 'split-char' } });
  if (grad) {
    const inGrad = split.chars.filter((c: HTMLElement) => grad.contains(c));
    grad.classList.remove(...gradClasses);
    inGrad.forEach((c: HTMLElement, i: number) => {
      c.classList.add(...gradClasses);
      c.style.backgroundSize = `${inGrad.length * 100}% 100%`;
      c.style.backgroundPosition = `${(i / Math.max(1, inGrad.length - 1)) * 100}% 0`;
    });
  }
  return split;
}

function initReveals() {
  $('[data-reveal]').forEach((el) => {
    const from = el.dataset.from;
    const x = from === 'left' ? -40 : from === 'right' ? 40 : 0;
    const y = x ? 0 : 28;
    whenVisible(el, () => animate(el, { opacity: [0, 1], x: [x, 0], y: [y, 0], duration: 900, ease: 'outExpo' }));
  });

  $('[data-stagger]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    const from = group.dataset.from;
    whenVisible(group, () =>
      animate(items, {
        opacity: [0, 1],
        x: from === 'left' ? [-40, 0] : 0,
        y: from === 'left' ? 0 : [40, 0],
        scale: [0.94, 1],
        delay: stagger(80),
        ease: spring({ bounce: 0.3, duration: 800 }),
      }),
    );
  });
}

function initCounters() {
  $('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const counter = { v: 0 };
    el.textContent = '0';
    whenVisible(el, () =>
      animate(counter, {
        v: target,
        duration: 1800,
        ease: 'outExpo',
        modifier: utils.round(0),
        onUpdate: () => (el.textContent = String(counter.v)),
      }),
    );
  });
}

/** Pointer-follow tilt on cards, using spring-backed animatables. */
function initTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  $('[data-tilt] > *').forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      animate(card, {
        rotateY: px * 8,
        rotateX: -py * 8,
        y: -6,
        duration: 400,
        ease: 'outQuad',
        composition: 'replace',
      });
    });
    card.addEventListener('pointerleave', () =>
      animate(card, { rotateX: 0, rotateY: 0, y: 0, ease: spring({ bounce: 0.4, duration: 700 }) }),
    );
  });
}

/** Journey rail grows with scroll position (scroll-synced, reversible). */
function initJourneyRail() {
  const rail = document.getElementById('journey-rail');
  const journey = document.getElementById('journey');
  if (!rail || !journey) return;
  animate(rail, {
    scaleY: [0, 1],
    ease: 'linear',
    autoplay: onScroll({ target: journey, enter: '80% top', leave: '50% bottom', sync: 0.25 }),
  });
}

function initMouseGlow() {
  const glow = document.getElementById('mouse-glow');
  if (!glow) return;
  let raf = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.setProperty('--mx', `${e.clientX}px`);
        glow.style.setProperty('--my', `${e.clientY}px`);
      });
    },
    { passive: true },
  );
}

initMenu();
initSkillFilter();
initMouseGlow();

if (!reduced) {
  initDotGrid();
  initHero();
  initHeadings();
  initReveals();
  initCounters();
  initTilt();
  initJourneyRail();
}
