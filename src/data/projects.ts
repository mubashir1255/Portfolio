/**
 * Every project on the site. The hero stats are computed from this list (src/data/stats.ts),
 * so adding a project here updates the numbers automatically.
 * Grep for `TODO:` to find what still needs filling in.
 */
import type { ImageMetadata } from 'astro';
import agrobid from '@/assets/projects/agrobid.jpg';
import asaanUdhaar from '@/assets/projects/asaan-udhaar.jpg';
import devEverTools from '@/assets/projects/devevertools.jpg';
import qevoraTech from '@/assets/projects/qevora-tech.jpg';

export type Category = 'Web' | 'AI' | 'Security' | 'Desktop' | 'Hardware';

export interface CaseStudy {
  problem: string;
  build: string;
  result: string;
  /** YouTube or Loom URL for a 60–90 s demo; loaded only on click */
  video?: string;
  diagram?: ImageMetadata;
}

export interface Project {
  slug: string;
  title: string;
  /** small line above the title */
  meta: string;
  /** the one-line problem it solves */
  summary: string;
  points: string[];
  tech: string[];
  /** first entry is the main category; extra entries are tags (e.g. Security) */
  categories: Category[];
  image?: ImageMetadata;
  imageAlt: string;
  links: { demo?: string; source?: string };
  /** source is private: show a badge instead of a dead link */
  privateRepo?: boolean;
  featured?: boolean;
  /** false = listed, but not counted in the hero stats (e.g. this portfolio) */
  countInStats?: boolean;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: 'agrobid',
    title: 'AgroBid Pakistan',
    meta: 'Final-year project · University of Lahore',
    summary: 'Farmers sell crops and livestock straight to buyers across Pakistan, at a fixed price or by live auction.',
    points: [
      'Full Urdu (Nastaliq, right-to-left) and English, designed phone-first',
      'Live bids and countdowns over Supabase Realtime; bid rules enforced in Postgres',
      'Gemini screens new listings and checks CNIC photos for a verified-seller badge',
      'OTP verification; installs as a PWA or an Android APK',
    ],
    tech: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Gemini', 'Tailwind'],
    categories: ['Web', 'AI', 'Security'],
    image: agrobid,
    imageAlt: 'AgroBid Pakistan listing page with live auction countdown',
    links: { demo: 'https://agrobid-pk.vercel.app' },
    privateRepo: true,
    featured: true,
    caseStudy: {
      problem: 'Farmers sell through middlemen at the mandi and rarely see what buyers would actually pay.',
      build: 'An online mandi with fixed-price and live-auction listings, realtime bidding, AI listing checks and seller verification.',
      result: 'TODO: Mubashir to fill (e.g. users, listings or FYP outcome). Live at agrobid-pk.vercel.app.',
      video: undefined, // TODO: Mubashir to add a 60–90 s demo video URL
      diagram: undefined, // TODO: Mubashir to add an architecture diagram
    },
  },
  {
    slug: 'asaan-udhaar',
    title: 'Asaan Udhaar',
    meta: 'Installable web app for shopkeepers',
    summary: 'Shops keep their credit ledger (khaata) on paper; this one works offline, bills customers and tracks stock.',
    points: [
      'Offline-first PWA; Urdu and English with one-tap switching',
      'POS billing and inventory; 58 mm thermal receipts',
      'WhatsApp slips for credit and payments, CSV export',
      'PIN lock and JSON backup and restore for shared shop devices',
    ],
    tech: ['Next.js 16', 'React 19', 'Zustand', 'PWA'],
    categories: ['Web'],
    image: asaanUdhaar,
    imageAlt: 'Asaan Udhaar customer ledger screen',
    links: { demo: 'https://asaan-udhaar.vercel.app' },
    privateRepo: true,
    featured: true,
    caseStudy: {
      problem: 'Small shops track who owes what in paper registers that get lost, and connectivity is unreliable.',
      build: 'An installable, offline-first ledger with POS billing, inventory, WhatsApp slips and a PIN lock.',
      result: 'TODO: Mubashir to fill. Live at asaan-udhaar.vercel.app.',
      video: undefined, // TODO: Mubashir to add a 60–90 s demo video URL
      diagram: undefined, // TODO: Mubashir to add an architecture diagram
    },
  },
  {
    slug: 'qevora-pos',
    title: 'Qevora POS',
    meta: 'Pharmacy point of sale · Windows & Android',
    summary: 'A pharmacy till where one PC holds the data and phones or extra tills join over the shop’s Wi-Fi.',
    points: [
      'Batches and expiry dates: oldest stock sells first, expired stock never does',
      'Pair phones by QR code; Lite mode for budget Android phones',
      'Ed25519-signed licence keys, staff permissions, daily SQLite backups',
    ],
    tech: ['Electron', 'React', 'Express', 'SQLite', 'Capacitor'],
    categories: ['Desktop', 'Security'],
    image: undefined, // TODO: Mubashir to add a Qevora POS screenshot
    imageAlt: 'Qevora POS checkout screen',
    links: {}, // no public demo yet
    privateRepo: true,
    featured: true,
    caseStudy: {
      problem: 'Pharmacies need to track batches and expiry dates, and to run more than one till without a server.',
      build: 'An Electron + React till with an Express/SQLite core on one PC; Android tills pair by QR code via Capacitor.',
      result: 'TODO: Mubashir to fill.',
      video: undefined, // TODO: Mubashir to add demo video (recording in progress)
      diagram: undefined, // TODO: Mubashir to add an architecture diagram
    },
  },
  {
    slug: 'local-rag',
    title: 'Local RAG Assistant',
    meta: 'Open source · runs fully offline',
    summary: 'A private chatbot on your own machine that answers from your own documents.',
    points: [
      'Transformer building blocks written in PyTorch: RoPE, RMSNorm, SwiGLU',
      'Tokens stream to the browser over Server-Sent Events',
      'PDFs and text are chunked, embedded with MiniLM and searched in ChromaDB',
    ],
    tech: ['Python', 'PyTorch', 'FastAPI', 'ChromaDB'],
    categories: ['AI'],
    imageAlt: 'Local RAG Assistant chat interface',
    links: { source: 'https://github.com/mubashir1255/local-rag-llm-assistant' },
  },
  {
    slug: 'devevertools',
    title: 'DevEverTools',
    meta: 'Open source · 35 browser tools',
    summary: 'Everyday developer utilities that run in the browser: no sign-up, no tracking, work offline.',
    points: [
      'JSON, SQL and Markdown formatters; JSON to TypeScript and Zod',
      'cURL to fetch, Axios or Python requests; SVG to JSX',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind'],
    categories: ['Web'],
    image: devEverTools,
    imageAlt: 'DevEverTools tool grid',
    links: { demo: 'https://dev-ever-tools.vercel.app', source: 'https://github.com/mubashir1255/DevEverTools' },
  },
  {
    slug: 'qevora-tech',
    title: 'Qevora Technologies',
    meta: 'Agency website',
    summary: 'Website for a Lahore software agency, rebuilt from React to Astro.',
    points: [
      'Page JavaScript cut from 398 KB to 213 KB',
      'Hero 3D scene in plain three.js, loaded once the browser is idle',
    ],
    tech: ['Astro', 'three.js', 'Tailwind', 'Vercel'],
    categories: ['Web'],
    image: qevoraTech,
    imageAlt: 'Qevora Technologies homepage',
    links: { demo: 'https://qevora-tech.vercel.app', source: 'https://github.com/Qevora-Technologies/qevora-technologies.github.io' },
  },
  {
    slug: 'store-pos',
    title: 'Store POS',
    meta: 'Desktop point of sale',
    summary: 'Point of sale for one till or a network of tills, rebuilt on React, Express and SQLite with JWT logins.',
    points: [],
    tech: ['Electron', 'React', 'Express', 'SQLite'],
    categories: ['Desktop'],
    imageAlt: 'Store POS sale screen',
    links: { source: 'https://github.com/mubashir1255/Store-POS' },
  },
  {
    slug: 'thesisguard',
    title: 'ThesisGuard',
    meta: 'Writing integrity tool',
    summary: 'Checks a thesis for plagiarism and AI-written content, then helps fix the flagged parts.',
    points: [],
    tech: ['React', 'Vite', 'Express', 'Gemini'],
    categories: ['AI', 'Web'],
    imageAlt: 'ThesisGuard report view',
    links: { source: 'https://github.com/mubashir1255/ThesisGuard' },
  },
  {
    slug: 'animal-classifier',
    title: 'Animal Classifier AI',
    meta: 'Transfer learning',
    summary: 'MobileNetV2 fine-tuned to tell five animals apart, at 98.8% validation accuracy.',
    points: [],
    tech: ['TensorFlow', 'Keras', 'Colab'],
    categories: ['AI'],
    imageAlt: 'Animal Classifier predictions on sample images',
    links: { source: 'https://github.com/mubashir1255/Animal-Classifier-AI' },
  },
  {
    slug: 'maze-robot',
    title: 'Maze-Solving Robot',
    meta: 'Hardware prototype',
    summary: 'A robot that reads its surroundings through sensors and finds its own way through a maze, deciding in real time.',
    points: [],
    tech: ['Embedded systems', 'Sensors', 'Control logic'], // TODO: Mubashir to add the board/parts used
    categories: ['Hardware'],
    image: undefined, // TODO: Mubashir to add a photo of the robot
    imageAlt: 'The maze-solving robot',
    links: {},
  },
  {
    slug: 'metal-detector',
    title: 'Metal Detector',
    meta: 'Hardware prototype',
    summary: 'A separate prototype that detects metal: the same sensor-and-logic approach, a different problem.',
    points: [],
    tech: ['Embedded systems', 'Sensors', 'Control logic'], // TODO: Mubashir to add the board/parts used
    categories: ['Hardware'],
    image: undefined, // TODO: Mubashir to add a photo of the detector
    imageAlt: 'The metal detector prototype',
    links: {},
  },
  {
    slug: 'portfolio',
    title: 'This portfolio',
    meta: 'Manga Volume edition',
    summary: 'The site you are reading: static Astro, comic panels, effects only when you interact.',
    points: [],
    tech: ['Astro', 'TypeScript', 'Tailwind'],
    categories: ['Web'],
    imageAlt: 'This portfolio’s hero section',
    links: { source: 'https://github.com/mubashir1255/Portfolio' },
    countInStats: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

/** Filter tabs: a category gets a tab only when at least 2 projects carry it. */
const MIN_PER_TAB = 2;
const order: Category[] = ['Web', 'AI', 'Security', 'Desktop', 'Hardware'];
export const projectCategories = order.filter(
  (c) => projects.filter((p) => p.categories.includes(c)).length >= MIN_PER_TAB,
);
