/**
 * ASCII globe renderer, shared by the build (first frame, works without JS) and the browser
 * (scroll-driven rotation). Land is ink ASCII shaded by a fixed light; the lat/long grid is blue
 * dots that turn with the globe; Pakistan is filled blue with a solid blue border; Lahore is a
 * glowing blue light.
 *
 * Geometry is precomputed once per size: rotating only shifts longitude, so a frame is just
 * mask lookups, cheap enough to redraw on every scroll frame.
 */
import { MASK_W, MASK_H, WORLD_MASK, PAK } from '@/data/world-mask';

const DEG = Math.PI / 180;
const TILT = 18 * DEG; // axial tilt toward the viewer, so the top of the globe shows
const RAMP = '.:-=+*#'; // land, lit side last
const HOME = { lat: 31.5, lon: 74.3 }; // Lahore

const unpack = (hex: string, w: number) => {
  const row = new Uint8Array(w);
  for (let i = 0; i < hex.length; i++) {
    const nib = parseInt(hex[i], 16);
    for (let b = 0; b < 4 && i * 4 + b < w; b++) row[i * 4 + b] = (nib >> (3 - b)) & 1;
  }
  return row;
};
/** Unpacked land bits: LAND[y][x] for a MASK_W x MASK_H equirectangular grid. */
const LAND: Uint8Array[] = WORLD_MASK.map((hex) => unpack(hex, MASK_W));
/** Pakistan, on its own finer grid. */
const PAK_BITS: Uint8Array[] = PAK.rows.map((hex) => unpack(hex, PAK.w));

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

const wrapLon = (lon: number) => ((((lon + 180) % 360) + 360) % 360) - 180;

const isPakistan = (lat: number, lon: number) => {
  const x = Math.floor((wrapLon(lon) - PAK.lon0) / PAK.step);
  const y = Math.floor((PAK.lat1 - lat) / PAK.step);
  return x >= 0 && y >= 0 && x < PAK.w && y < PAK.h && PAK_BITS[y][x] === 1;
};

/** Is (lat, lon) on the blue grid: every 15 degrees, sampled sparsely so it reads as dots. */
const onGrid = (lat: number, lon: number, c: number, r: number) => {
  const nearLon = Math.abs(((lon % 15) + 15) % 15 - 7.5) > 6.1;
  const nearLat = Math.abs(((lat % 15) + 15) % 15 - 7.5) > 6.6;
  return (nearLon && r % 2 === 0) || (nearLat && c % 2 === 0);
};

/** What a cell shows. Exported so the canvas renderer can pick colours. */
export enum K {
  Empty,
  Land,
  Grid,
  Rim,
  PakFill,
  PakBorder,
  Home,
}

export interface Frame {
  cols: number;
  rows: number;
  kind: Uint8Array;
  chars: string[];
  /** index of Lahore's cell, or -1 when it's on the far side */
  home: number;
}

/** One frame as cells. `centerLon` is the longitude facing the viewer. */
export function frame(g: GlobeGeometry, centerLon: number): Frame {
  const { cols, rows, cells } = g;
  const kind = new Uint8Array(cols * rows);
  const shade = new Uint8Array(cols * rows);
  let home = -1;
  let homeDist = Infinity;
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (!cell.inside) continue;
    const lon = cell.lon0 + centerLon;
    const c = i % cols;
    const r = (i / cols) | 0;
    shade[i] = Math.min(RAMP.length - 1, Math.floor(cell.light * RAMP.length));
    const dLat = cell.lat - HOME.lat;
    const dLon = wrapLon(lon) - HOME.lon;
    const dist = dLat * dLat + dLon * dLon;
    if (dist < homeDist && dist < 9) {
      homeDist = dist;
      home = i;
    }
    if (isPakistan(cell.lat, lon)) kind[i] = K.PakFill;
    else if (isLand(cell.lat, lon)) kind[i] = K.Land;
    else if (onGrid(cell.lat, lon, c, r)) kind[i] = K.Grid;
    else if (cell.rim) kind[i] = K.Rim;
  }
  if (home >= 0) kind[home] = K.Home; // Lahore: the one cell closest to it
  const inPak = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
    const k = kind[r * cols + c];
    return k === K.PakFill || k === K.PakBorder || k === K.Home;
  };
  const chars: string[] = new Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      switch (kind[i]) {
        case K.Home:
          chars[i] = '●';
          break;
        case K.PakFill:
          if (!inPak(r - 1, c) || !inPak(r + 1, c) || !inPak(r, c - 1) || !inPak(r, c + 1)) {
            kind[i] = K.PakBorder;
            chars[i] = '#';
          } else chars[i] = RAMP[Math.max(2, shade[i])];
          break;
        case K.Land:
          chars[i] = RAMP[shade[i]];
          break;
        case K.Grid:
        case K.Rim:
          chars[i] = '.';
          break;
        default:
          chars[i] = ' ';
      }
    }
  }
  return { cols, rows, kind, chars, home };
}

/** Text version (for <noscript>): <b> grid, <em> Pakistan fill, <u> its border, <i> Lahore. */
export function renderGlobe(g: GlobeGeometry, centerLon: number): string {
  const f = frame(g, centerLon);
  const tagOf: Record<number, string> = { [K.Grid]: 'b', [K.PakFill]: 'em', [K.PakBorder]: 'u', [K.Home]: 'i' };
  let out = '';
  let open = '';
  for (let r = 0; r < f.rows; r++) {
    for (let c = 0; c < f.cols; c++) {
      const i = r * f.cols + c;
      const tag = tagOf[f.kind[i]] ?? '';
      if (tag !== open) {
        if (open) out += `</${open}>`;
        if (tag) out += `<${tag}>`;
        open = tag;
      }
      out += f.chars[i];
    }
    if (open) {
      out += `</${open}>`;
      open = '';
    }
    out += '\n';
  }
  return out;
}

/** Longitude facing the viewer at the top of the page: Pakistan. */
export const START_LON = HOME.lon;
