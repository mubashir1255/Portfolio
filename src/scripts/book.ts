/**
 * The whole portfolio as a book.
 *
 * Pages are real HTML <article class="page"> elements, listed in reading order in
 * #book-pages. At rest the live pages sit in two slots (left/right), so links and the
 * contact form keep working. A turn builds a temporary "leaf" from inert copies of the
 * two pages printed on that sheet; the leaf is a chain of hinged strips that bend by
 * slightly different angles, so the paper curls instead of flipping flat.
 *
 * Desktop shows two-page spreads and starts closed on the cover; phones show one page
 * flipping from a left spine. Turn by click, drag/swipe, arrow keys, wheel, the arrows,
 * the dots, or any #anchor link (which riffles quickly to that chapter).
 */
import { animate, utils, type JSAnimation } from 'animejs';

export type BookEvents = {
  /** Pages that become visible underneath as a turn starts (for entrance effects). */
  onReveal?: (pages: HTMLElement[]) => void;
  /** Fired when a turn starts; x/y is the spine position on screen. */
  onTurn?: (x: number, y: number) => void;
  /** Fired after a turn settles with the pages now visible. */
  onSettle?: (pages: HTMLElement[]) => void;
};

type Spread = [HTMLElement | null, HTMLElement | null];

const DESIGN_W = 520; // desktop page size, scaled to fit the screen
const DESIGN_H = 720;
const CURL = 70; // degrees the free edge leads by at mid-turn

export function initBook(reduced: boolean, events: BookEvents = {}) {
  const root = document.getElementById('book-root');
  const book = document.getElementById('book');
  const scaler = document.getElementById('book-scaler');
  const viewport = document.getElementById('book-viewport');
  const store = document.getElementById('book-pages');
  const prevBtn = document.getElementById('book-prev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('book-next') as HTMLButtonElement | null;
  const dotsEl = document.getElementById('book-dots');
  const labelEl = document.getElementById('book-label');
  const statusEl = document.getElementById('book-status');
  if (!root || !book || !scaler || !viewport || !store || !dotsEl || !labelEl) return null;

  const pages = Array.from(store.querySelectorAll<HTMLElement>(':scope > .page'));
  document.documentElement.classList.add('book-on');

  /* ── geometry ── */
  let single = false;
  let W = DESIGN_W;
  let H = DESIGN_H;
  let spreads: Spread[] = [];
  let idx = 0;

  /* ── persistent DOM ── */
  const board = el('div', 'book-board');
  const leftHalf = el('div', 'book-half is-left');
  const rightHalf = el('div', 'book-half is-right');
  const leftSlot = el('div', 'book-slot is-verso');
  const rightSlot = el('div', 'book-slot is-recto');
  const leftCast = el('div', 'book-cast');
  const rightCast = el('div', 'book-cast');
  leftHalf.append(leftSlot, leftCast);
  rightHalf.append(rightSlot, rightCast);
  book.append(board, leftHalf, rightHalf);

  function el(tag: string, cls: string) {
    const e = document.createElement(tag);
    e.className = cls;
    return e;
  }

  function show(slot: HTMLElement, page: HTMLElement | null) {
    const current = slot.firstElementChild as HTMLElement | null;
    if (current === page) return;
    if (current) store!.appendChild(current);
    if (page) slot.appendChild(page);
  }

  function layout() {
    const keepPage = spreads.length ? (spreads[idx][1] ?? spreads[idx][0]) : null;
    single = window.innerWidth < 768;
    document.documentElement.classList.toggle('book-single', single);
    const vw = viewport!.clientWidth;
    const vh = viewport!.clientHeight;
    let scale = 1;
    if (single) {
      W = Math.min(vw - 8, 480);
      H = Math.min(vh - 16, 860);
    } else {
      W = DESIGN_W;
      H = DESIGN_H;
      scale = Math.min((vw - 24) / (W * 2 + 24), (vh - 24) / (H + 24), 1.25);
    }
    document.documentElement.style.setProperty('--pw', `${W}px`);
    document.documentElement.style.setProperty('--ph', `${H}px`);
    scaler!.style.transform = `scale(${scale})`;
    scaler!.style.width = `${single ? W : W * 2}px`;
    scaler!.style.height = `${H}px`;
    book!.style.width = `${single ? W : W * 2}px`;
    book!.style.height = `${H}px`;

    leftHalf.style.display = single ? 'none' : '';
    leftHalf.style.width = rightHalf.style.width = `${W}px`;
    leftHalf.style.left = '0px';
    rightHalf.style.left = single ? '0px' : `${W}px`;

    // spreads
    spreads = single
      ? pages.map((p) => [null, p] as Spread)
      : [[null, pages[0]] as Spread].concat(
          Array.from({ length: Math.ceil((pages.length - 1) / 2) }, (_, k) => [
            pages[1 + k * 2] ?? null,
            pages[2 + k * 2] ?? null,
          ] as Spread),
        );
    idx = keepPage ? Math.max(0, spreads.findIndex((s) => s.includes(keepPage))) : 0;
    rest();
    renderDots();
  }

  /** Openness 0 = closed on the cover (desktop), 1 = open spread. */
  const openness = (i: number) => (single || spreads[i][0] ? 1 : 0);

  function setOpen(o: number) {
    if (single) {
      book!.style.transform = '';
      board.style.left = '-10px';
      board.style.right = '-10px';
      return;
    }
    book!.style.transform = `translateX(${(-W / 2) * (1 - o)}px)`;
    board.style.left = `${(1 - o) * W - 12}px`;
    board.style.right = '-12px';
    leftHalf.classList.toggle('is-empty', o < 0.5);
  }

  function rest() {
    show(leftSlot, single ? null : spreads[idx][0]);
    show(rightSlot, spreads[idx][1]);
    leftHalf.classList.toggle('is-empty', !spreads[idx][0]);
    rightHalf.classList.toggle('is-empty', !spreads[idx][1]);
    setOpen(openness(idx));
    leftCast.style.opacity = rightCast.style.opacity = '0';
    updateUi();
  }

  /* ── the turning leaf ── */
  function copyOf(page: HTMLElement | null) {
    if (!page) {
      const blank = el('article', 'page');
      return blank;
    }
    const c = page.cloneNode(true) as HTMLElement;
    c.removeAttribute('id');
    c.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    c.setAttribute('inert', '');
    c.setAttribute('aria-hidden', 'true');
    const body = c.querySelector<HTMLElement>('.page-body');
    const srcBody = page.querySelector<HTMLElement>('.page-body');
    if (body && srcBody) body.style.transform = `translateY(${-srcBody.scrollTop}px)`;
    return c;
  }

  function buildLeaf(front: HTMLElement | null, back: HTMLElement | null) {
    const N = single ? 9 : 12;
    const sw = W / N;
    const leaf = el('div', 'book-leaf');
    leaf.style.left = single ? '0px' : `${W}px`;
    const strips: HTMLElement[] = [];
    const shades: HTMLElement[] = [];
    let parent: HTMLElement = leaf;
    for (let i = 0; i < N; i++) {
      const strip = el('div', 'book-strip');
      strip.style.width = `${sw}px`;
      strip.style.left = i === 0 ? '0px' : `${sw}px`;
      const f = el('div', 'book-face is-front is-recto');
      const b = el('div', 'book-face is-back is-verso');
      const fp = copyOf(front);
      fp.style.left = `${-i * sw}px`;
      const bp = copyOf(back);
      bp.style.left = `${-(N - 1 - i) * sw}px`;
      f.appendChild(fp);
      b.appendChild(bp);
      for (const face of [f, b]) {
        const sh = el('div', 'book-shade');
        face.appendChild(sh);
        shades.push(sh);
      }
      strip.append(f, b);
      parent.appendChild(strip);
      strips.push(strip);
      parent = strip;
    }
    book!.appendChild(leaf);

    /** e = 0: lying on the right; e = 1: turned over onto the left. */
    const set = (e: number, oFrom: number, oTo: number) => {
      const curl = Math.sin(Math.PI * e);
      const base = -180 * e;
      let prev = 0;
      for (let i = 0; i < N; i++) {
        const a = utils.clamp(base - curl * CURL * (i / (N - 1)) ** 1.5, -180, 0);
        strips[i].style.transform = `rotateY(${(a - prev).toFixed(2)}deg)`;
        prev = a;
        const s = ((1 - Math.abs(Math.cos((a * Math.PI) / 180))) * 0.5).toFixed(3);
        shades[i * 2].style.opacity = s;
        shades[i * 2 + 1].style.opacity = s;
      }
      rightCast.style.opacity = e < 0.5 ? (curl * 0.85).toFixed(3) : '0';
      leftCast.style.opacity = e >= 0.5 ? (curl * 0.85).toFixed(3) : '0';
      setOpen(oFrom + (oTo - oFrom) * e);
    };
    return { leaf, set };
  }

  /* ── turning ── */
  let busy = false;
  let queued = 0;

  type Turn = { e: number; set: (e: number) => void; finish: (fast?: boolean) => Promise<void>; cancel: () => Promise<void> };

  /** Prepare a turn from idx toward idx+dir. Returns null at the ends. */
  function begin(dir: 1 | -1): Turn | null {
    const to = idx + dir;
    if (to < 0 || to >= spreads.length) return null;
    busy = true;
    const lo = Math.min(idx, to); // the leaf sits between spread lo and lo+1
    const front = spreads[lo][1];
    const back = single ? null : spreads[lo + 1][0];
    const { leaf, set } = buildLeaf(front, back);
    const oFrom = openness(lo);
    const oTo = openness(lo + 1);

    // what shows underneath during the turn
    if (dir > 0) show(rightSlot, spreads[to][1]);
    else if (!single) show(leftSlot, spreads[to][0]);
    rightHalf.classList.toggle('is-empty', !rightSlot.firstElementChild);
    const revealed = dir > 0 ? spreads[to][1] : spreads[to][0];
    if (revealed) events.onReveal?.([revealed]);
    const r = book!.getBoundingClientRect();
    events.onTurn?.(single ? r.left : r.left + r.width / 2, r.top + r.height / 2);

    const state = { e: dir > 0 ? 0 : 1 };
    set(state.e, oFrom, oTo);
    let anim: JSAnimation | null = null;

    const run = (target: number, fast: boolean) =>
      new Promise<void>((resolve) => {
        anim?.pause();
        const dist = Math.abs(target - state.e);
        if (reduced || dist < 0.001) {
          state.e = target;
          set(target, oFrom, oTo);
          return resolve();
        }
        anim = animate(state, {
          e: target,
          duration: (fast ? 380 : 1050) * Math.max(0.35, dist),
          ease: fast ? 'inOutQuad' : 'inOutSine',
          onUpdate: () => set(state.e, oFrom, oTo),
          onComplete: () => resolve(),
        });
      });

    const end = (landed: number) => {
      leaf.remove();
      idx = landed;
      rest();
      busy = false;
      events.onSettle?.(spreads[idx].filter(Boolean) as HTMLElement[]);
      announce();
    };

    return {
      get e() {
        return state.e;
      },
      set: (e: number) => {
        state.e = e;
        set(e, oFrom, oTo);
      },
      finish: async (fast = false) => {
        await run(dir > 0 ? 1 : 0, fast);
        end(to);
      },
      cancel: async () => {
        await run(dir > 0 ? 0 : 1, true);
        end(idx);
      },
    } as Turn;
  }

  async function turn(dir: 1 | -1, fast = false) {
    if (busy) {
      queued = dir;
      return;
    }
    const t = begin(dir);
    if (!t) return;
    await t.finish(fast);
    if (queued) {
      const q = queued as 1 | -1;
      queued = 0;
      turn(q);
    }
  }

  async function goTo(target: number) {
    target = utils.clamp(target, 0, spreads.length - 1);
    if (busy || target === idx) return;
    const dir = target > idx ? 1 : -1;
    while (idx !== target) {
      const t = begin(dir);
      if (!t) break;
      await t.finish(Math.abs(target - idx) > 1);
    }
  }

  function spreadOfAnchor(anchor: string) {
    const page = pages.find((p) => p.dataset.anchor === anchor);
    return page ? spreads.findIndex((s) => s.includes(page)) : -1;
  }

  /* ── UI ── */
  function renderDots() {
    dotsEl!.innerHTML = '';
    spreads.forEach((_, i) => {
      const d = el('button', 'book-dot') as HTMLButtonElement;
      d.type = 'button';
      d.setAttribute('aria-label', `Go to page ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsEl!.appendChild(d);
    });
    updateUi();
  }
  function updateUi() {
    Array.from(dotsEl!.children).forEach((d, i) => d.classList.toggle('is-active', i === idx));
    const p = spreads[idx]?.[1] ?? spreads[idx]?.[0];
    labelEl!.textContent = p?.dataset.chapter ?? '';
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === spreads.length - 1;
  }
  function announce() {
    const p = spreads[idx][1] ?? spreads[idx][0];
    if (statusEl) statusEl.textContent = `Page ${idx + 1} of ${spreads.length}: ${p?.dataset.chapter ?? ''}`;
    const anchor = spreads[idx].map((x) => x?.dataset.anchor).find(Boolean);
    history.replaceState(null, '', anchor ? `#${anchor}` : location.pathname + location.search);
  }

  /* ── input ── */
  prevBtn?.addEventListener('click', () => turn(-1));
  nextBtn?.addEventListener('click', () => turn(1));

  document.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') turn(1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') turn(-1);
    else if (e.key === 'Home') goTo(0);
    else if (e.key === 'End') goTo(spreads.length - 1);
    else return;
    e.preventDefault();
  });

  // Any in-page #anchor link riffles to its chapter.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const anchor = a.getAttribute('href')!.slice(1);
    if (anchor === 'main-content') return;
    const s = anchor ? spreadOfAnchor(anchor) : -1;
    if (s < 0) return;
    e.preventDefault();
    goTo(s);
  });

  // Back/forward buttons and pasted #links
  window.addEventListener('hashchange', () => {
    const s = spreadOfAnchor(location.hash.slice(1));
    if (s >= 0 && s !== idx) goTo(s);
  });

  // Wheel / trackpad: one turn per gesture, unless the page itself can scroll.
  let wheelLock = 0;
  root.addEventListener(
    'wheel',
    (e) => {
      const body = (e.target as Element).closest<HTMLElement>('.page-body');
      if (body) {
        const canDown = body.scrollTop + body.clientHeight < body.scrollHeight - 2;
        const canUp = body.scrollTop > 0;
        if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) return;
      }
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 12 || performance.now() < wheelLock) return;
      wheelLock = performance.now() + 900;
      turn(d > 0 ? 1 : -1);
    },
    { passive: false },
  );

  // Drag a page (or swipe) to turn it by hand; a plain click turns it.
  let drag: { x: number; y: number; side: 1 | -1; turn: Turn | null; dir: 1 | -1; id: number } | null = null;
  book.addEventListener('pointerdown', (e) => {
    if (busy || e.button !== 0) return;
    if ((e.target as Element).closest('a, button, input, textarea, select, label')) return;
    const r = book.getBoundingClientRect();
    const side: 1 | -1 = single ? (e.clientX > r.left + r.width / 2 ? 1 : -1) : e.clientX > r.left + r.width / 2 ? 1 : -1;
    drag = { x: e.clientX, y: e.clientY, side, turn: null, dir: side, id: e.pointerId };
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.turn) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
      drag.dir = single ? (dx < 0 ? 1 : -1) : drag.side;
      drag.turn = begin(drag.dir);
      if (!drag.turn) {
        drag = null;
        return;
      }
      book.classList.add('is-dragging');
    }
    const r = book.getBoundingClientRect();
    const span = single ? r.width * 0.9 : r.width * 0.55;
    const p = utils.clamp((drag.dir > 0 ? -dx : dx) / span, 0, 1);
    drag.turn.set(drag.dir > 0 ? p : 1 - p);
  });
  const release = async (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    book.classList.remove('is-dragging');
    if (!d.turn) {
      // a click without dragging
      if (Math.abs(e.clientX - d.x) < 6 && Math.abs(e.clientY - d.y) < 6) turn(d.side);
      return;
    }
    const progress = d.dir > 0 ? d.turn.e : 1 - d.turn.e;
    if (progress > 0.28) await d.turn.finish(true);
    else await d.turn.cancel();
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);

  // Resize: re-measure, keep the current page.
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(() => !busy && layout(), 150);
  });

  /* ── start ── */
  layout();
  const startAnchor = location.hash.slice(1);
  const start = startAnchor ? spreadOfAnchor(startAnchor) : -1;
  if (start > 0) {
    idx = start;
    rest();
  }
  events.onSettle?.(spreads[idx].filter(Boolean) as HTMLElement[]);

  return { goTo, turn, get index() { return idx; } };
}
