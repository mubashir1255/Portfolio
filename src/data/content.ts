import { withBase } from '@/lib';

export const heroChips = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL',
  'Docker', 'AWS', 'AI Automation', 'Cybersecurity', 'Vercel', 'CI/CD',
];

export const highlights = [
  { icon: 'code', title: 'Full Stack', text: 'Next.js · React · Supabase' },
  { icon: 'cloud', title: 'Cloud & Deployment', text: 'AWS · Docker · Vercel · CI/CD' },
  { icon: 'sparkles', title: 'AI Automation', text: 'Gemini API · API Integration' },
  { icon: 'shield', title: 'Cybersecurity', text: 'Auth · API Security · Defense' },
] as const;

export const stats = [
  { value: 20, suffix: '+', label: 'Projects Built' },
  { value: 16, suffix: '+', label: 'Technologies' },
  { value: 2023, suffix: '', label: 'Started Coding' },
];

export const skillCategories = [
  {
    icon: 'code',
    title: 'Frontend & Full Stack',
    tagline: 'Interfaces that are fast, accessible and type-safe.',
    skills: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Responsive UI/UX'],
  },
  {
    icon: 'database',
    title: 'Backend & Databases',
    tagline: 'APIs, schemas and the data layer behind them.',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Prisma ORM', 'RESTful APIs'],
  },
  {
    icon: 'cloud',
    title: 'Cloud Computing & DevOps',
    tagline: 'Containers, servers and the infrastructure they run on.',
    skills: ['Cloud Computing', 'AWS (S3 & EC2)', 'Docker', 'Linux Server Admin', 'Microservices', 'Scalable Architectures'],
  },
  {
    icon: 'sparkles',
    title: 'AI Automation & APIs',
    tagline: 'Wiring AI models and third-party APIs into real workflows.',
    skills: ['AI Automation', 'Gemini API', 'API Integration', 'Webhooks & Automation', 'LLM Tool Calling', 'Workflow Pipelines'],
  },
  {
    icon: 'rocket',
    title: 'Deployment & CI/CD',
    tagline: 'Getting code from a commit to production, automatically.',
    skills: ['Vercel Deployment', 'GitHub Actions (CI/CD)', 'GitHub Pages', 'Git Version Control', 'Static & SSR Hosting', 'Domain Configuration'],
  },
  {
    icon: 'shield',
    title: 'Cybersecurity & Web Defense',
    tagline: 'Auth, access control, and keeping secrets secret.',
    skills: ['Cybersecurity Basics', 'Authentication & JWT', 'Role-Based Access (RBAC)', 'API Security & CORS', 'Environment Protection', 'Input Validation'],
  },
] as const;

export type Project = {
  title: string;
  meta: string;
  description: string;
  points: string[];
  tech: string[];
  /** screenshot, or a drawn stand-in for projects without a live site */
  visual: { image: string } | { kind: 'receipt' | 'diagram' };
  github?: string; // omitted for private repositories
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'AgroBid Pakistan',
    meta: 'Final-year project · University of Lahore',
    description:
      'An online mandi for Pakistani farmers. List crops and livestock, then sell at a fixed price or by live auction, straight to buyers across the country.',
    points: [
      'Full Urdu (Nastaliq, right-to-left) and English, designed phone-first',
      'Live bids and countdowns over Supabase Realtime; bid rules enforced in Postgres',
      'Gemini screens new listings and checks CNIC photos for a verified-seller badge',
    ],
    tech: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Gemini', 'Tailwind'],
    visual: { image: withBase('projects/agrobid.jpg') },
    demo: 'https://agrobid-pk.vercel.app',
  },
  {
    title: 'Asaan Udhaar',
    meta: 'Installable web app for shopkeepers',
    description:
      'An offline-first credit ledger (khaata) for Pakistani shops, with POS billing and inventory. Installs like an app and works without internet.',
    points: [
      'Urdu and English with one-tap switching',
      'WhatsApp slips for credit and payments, CSV export, 58 mm thermal receipts',
      'PIN lock and JSON backup and restore for shared shop devices',
    ],
    tech: ['Next.js 16', 'React 19', 'Zustand', 'PWA'],
    visual: { image: withBase('projects/asaan-udhaar.jpg') },
    demo: 'https://asaan-udhaar.vercel.app',
  },
  {
    title: 'Qevora POS',
    meta: 'Pharmacy point of sale · Windows & Android',
    description:
      'A pharmacy till for Windows and Android. One main PC holds the data; phones and extra tills join over the shop’s Wi-Fi.',
    points: [
      'Batches and expiry dates: oldest stock sells first, expired stock never does',
      'Pair phones by QR code; Lite mode for budget Android phones',
      'Ed25519-signed licence keys, staff permissions, daily SQLite backups',
    ],
    tech: ['Electron', 'React', 'Express', 'SQLite', 'Capacitor'],
    visual: { kind: 'receipt' },
  },
  {
    title: 'Local RAG Assistant',
    meta: 'Open source · runs fully offline',
    description:
      'A private chatbot that runs on your own machine: a small transformer in PyTorch, served by FastAPI, answering from your own documents.',
    points: [
      'Transformer building blocks written in PyTorch: RoPE, RMSNorm, SwiGLU',
      'Tokens stream to the browser over Server-Sent Events',
      'Upload PDFs or text; chunked, embedded with MiniLM and searched in ChromaDB',
    ],
    tech: ['Python', 'PyTorch', 'FastAPI', 'ChromaDB'],
    visual: { kind: 'diagram' },
    github: 'https://github.com/mubashir1255/local-rag-llm-assistant',
  },
  {
    title: 'DevEverTools',
    meta: 'Open source · 35 browser tools',
    description:
      'Everyday developer utilities that run entirely in the browser. No sign-up, no tracking, and they keep working offline.',
    points: [
      'JSON, SQL and Markdown formatters; JSON to TypeScript and Zod',
      'cURL to fetch, Axios or Python requests; SVG to JSX; CSS unit converter',
      'Hashes, timestamps, hex inspector and a mock data generator',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind'],
    visual: { image: withBase('projects/devevertools.jpg') },
    github: 'https://github.com/mubashir1255/DevEverTools',
    demo: 'https://dev-ever-tools.vercel.app',
  },
  {
    title: 'Qevora Technologies',
    meta: 'Agency website',
    description: 'The website for Qevora Technologies, a software agency in Lahore: services, process, team and contact.',
    points: [
      'Rebuilt from React to Astro, cutting the page’s JavaScript from 398 KB to 213 KB',
      'Hero 3D scene in plain three.js, loaded once the browser is idle',
      'Deployed on Vercel; the old GitHub Pages address redirects to it',
    ],
    tech: ['Astro', 'three.js', 'Tailwind', 'Vercel'],
    visual: { image: withBase('projects/qevora-tech.jpg') },
    github: 'https://github.com/Qevora-Technologies/qevora-technologies.github.io',
    demo: 'https://qevora-tech.vercel.app',
  },
];

export const moreProjects = [
  {
    title: 'Store POS',
    text: 'Desktop point of sale for one till or a network of tills. Rebuilt an Electron app on React, Express and SQLite with JWT logins.',
    tech: 'Electron · React · Express · SQLite',
    href: 'https://github.com/mubashir1255/Store-POS',
  },
  {
    title: 'ThesisGuard',
    text: 'Checks a thesis for plagiarism and AI-written content, then helps fix the flagged parts.',
    tech: 'React · Vite · Express · Gemini',
    href: 'https://github.com/mubashir1255/ThesisGuard',
  },
  {
    title: 'Animal Classifier AI',
    text: 'Transfer learning on MobileNetV2 to tell apart five animals; 98.8% validation accuracy.',
    tech: 'TensorFlow · Keras · Colab',
    href: 'https://github.com/mubashir1255/Animal-Classifier-AI',
  },
  {
    title: 'This portfolio',
    text: 'The book you are reading. Pages turn with a curl made from hinged paper strips.',
    tech: 'Astro · TypeScript · anime.js',
    href: 'https://github.com/mubashir1255/Portfolio',
  },
];

export const timeline = [
  { year: '2023', title: 'Started BS Information Technology', description: 'Began learning programming, databases, networking, and software engineering.' },
  { year: '2024', title: 'Explored Web Development', description: 'Built projects using HTML, CSS, JavaScript, React and started learning Next.js.' },
  { year: '2025', title: 'Cloud & Backend', description: 'Learned Docker, AWS, PostgreSQL, Prisma and modern backend development.' },
  { year: '2026', title: 'Built Qevora Technologies', description: 'Built and launched the Qevora Technologies agency website.' },
  { year: '2026 - Now', title: 'Still Working on AgroBid Pakistan', description: 'Still building AgroBid Pakistan, while preparing for internships and software engineering roles.' },
];

export const chapters = [
  { num: 'I', title: 'Hello', anchor: 'hello', page: 1 },
  { num: 'II', title: 'About', anchor: 'about', page: 2 },
  { num: 'III', title: 'Skills', anchor: 'skills', page: 4 },
  { num: 'IV', title: 'Projects', anchor: 'projects', page: 6 },
  { num: 'V', title: 'Journey', anchor: 'experience', page: 13 },
  { num: 'VI', title: 'Contact', anchor: 'contact', page: 14 },
];
