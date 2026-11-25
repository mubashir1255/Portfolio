/**
 * ASCII globe renderer, shared by the build (first frame, works without JS) and the browser
 * (scroll-driven rotation). Land is ink ASCII shaded by a fixed light; the lat/long grid is blue
 * dots that turn with the globe; Lahore gets a blue marker.
 *
 * Geometry is precomputed once per size: rotating only shifts longitude, so a frame is just
 * mask lookups, cheap enough to redraw on every scroll frame.
 */
import { MASK_W, MASK_H, WORLD_MASK } from '@/data/world-mask';

const DEG = Math.PI / 180;
const TILT = 18 * DEG; // axial tilt toward the viewer, so the top of the globe shows
const RAMP = '.:-=+*#'; // land, lit side last
const HOME = { lat: 31.5, lon: 74.3 }; // Lahore

/** Unpacked land bits: LAND[y][x] for a MASK_W x MASK_H equirectangular grid. */
const LAND: Uint8Array[] = WORLD_MASK.map((hex) => {
  const row = new Uint8Array(MASK_W);
  for (let i = 0; i < hex.length; i++) {
    const nib = parseInt(hex[i], 16);
    for (let b = 0; b < 4; b++) row[i * 4 + b] = (nib >> (3 - b)) & 1;
  }
  return row;
});

interface Cell {
  inside: boolean;
  lat: number; // degrees
  lon0: number; // degrees, before rotation
  light: number; // 0..1
  rim: boolean;
}

export interface GlobeGeometry {
  cols: number;
  rows: number;
  cells: Cell[];
}

/** Characters are ~0.6 as wide as tall with line-height 1, so a circle needs rows = cols * 0.6. */
export function geometry(cols: number): GlobeGeometry {
  const rows = Math.round(cols * 0.6);
  const light = normalize([-0.45, 0.55, 0.7]);
  const cells: Cell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ((c + 0.5) / cols) * 2 - 1;
      const y = 1 - ((r + 0.5) / rows) * 2;
      const d2 = x * x + y * y;
      if (d2 > 1) {
        cells.push({ inside: false, lat: 0, lon0: 0, light: 0, rim: false });
        continue;
      }
      const z = Math.sqrt(1 - d2);
      // undo the tilt (rotate about the x axis) to get globe coordinates
      const gy = y * Math.cos(TILT) + z * Math.sin(TILT);
      const gz = -y * Math.sin(TILT) + z * Math.cos(TILT);
      cells.push({
        inside: true,
        lat: Math.asin(Math.max(-1, Math.min(1, gy))) / DEG,
        lon0: Math.atan2(x, gz) / DEG,
        light: Math.max(0, x * light[0] + y * light[1] + z * light[2]),
        rim: d2 > 0.93,
      });
    }
  }
  return { cols, rows, cells };
}

function normalize(v: number[]) {
  const l = Math.hypot(...v);
  return v.map((n) => n / l);
}

const isLand = (lat: number, lon: number) => {
  const x = Math.floor((((lon + 180) % 360) + 360) % 360 / (360 / MASK_W));
  const y = Math.min(MASK_H - 1, Math.max(0, Math.floor((90 - lat) / (180 / MASK_H))));
  return LAND[y][x] === 1;
};

/** Is (lat, lon) on the blue grid: every 15 degrees, sampled sparsely so it reads as dots. */
const onGrid = (lat: number, lon: number, c: number, r: number) => {
  const nearLon = Math.abs(((lon % 15) + 15) % 15 - 7.5) > 6.1;
  const nearLat = Math.abs(((lat % 15) + 15) % 15 - 7.5) > 6.6;
  return (nearLon && r % 2 === 0) || (nearLat && c % 2 === 0);
};

/**
 * One frame as HTML: plain text for land, <b> for blue grid dots, <i> for the home marker.
 * `centerLon` is the longitude facing the viewer.
 */
export function renderGlobe(g: GlobeGeometry, centerLon: number): string {
  let out = '';
  let open: '' | 'b' | 'i' = '';
  const put = (ch: string, tag: '' | 'b' | 'i') => {
    if (tag !== open) {
      if (open) out += `</${open}>`;
      if (tag) out += `<${tag}>`;
      open = tag;
    }
    out += ch;
  };
  for (let r = 0; r < g.rows; r++) {
    for (let c = 0; c < g.cols; c++) {
      const cell = g.cells[r * g.cols + c];
      if (!cell.inside) {
        put(' ', '');
        continue;
      }
      const lon = cell.lon0 + centerLon;
      const lonWrapped = ((((lon + 180) % 360) + 360) % 360) - 180;
      const home = Math.abs(cell.lat - HOME.lat) < 1.25 && Math.abs(lonWrapped - HOME.lon) < 1.5;
      if (home) put('@', 'i');
      else if (isLand(cell.lat, lon)) put(RAMP[Math.min(RAMP.length - 1, Math.floor(cell.light * RAMP.length))], '');
      else if (onGrid(cell.lat, lon, c, r)) put('.', 'b');
      else if (cell.rim) put('.', '');
      else put(' ', '');
    }
    put('\n', '');
  }
  if (open) out += `</${open}>`;
  return out;
}

/** Longitude facing the viewer at the top of the page: Pakistan. */
export const START_LON = HOME.lon;
