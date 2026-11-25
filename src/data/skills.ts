/**
 * Chapter 03 "Power-ups". Each chip's tooltip says where the skill was used, taken from the
 * projects on this site, the resume or the DPO internship. No percentages, no power levels.
 * A skill without `usedIn` shows as a plain chip; add where you used it to give it a tooltip.
 */
export interface Skill {
  name: string;
  /** projects or roles; shown as "Used in: …" */
  usedIn?: string;
  /** free-form tooltip instead of "Used in: …" */
  note?: string;
}
export interface SkillGroup {
  title: string;
  tagline: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend & Full Stack',
    tagline: 'Interfaces that are fast, accessible and type-safe.',
    skills: [
      { name: 'Next.js (App Router)', usedIn: 'AgroBid Pakistan, Asaan Udhaar, DevEverTools' },
      { name: 'React 19', usedIn: 'Asaan Udhaar, DevEverTools' },
      { name: 'TypeScript', usedIn: 'DevEverTools, this portfolio' },
      { name: 'Tailwind CSS', usedIn: 'AgroBid Pakistan, DevEverTools, Qevora Technologies' },
      { name: 'Framer Motion', usedIn: 'Qevora Technologies site (React version)' },
      { name: 'Responsive UI', usedIn: 'AgroBid Pakistan: phone-first, Urdu right-to-left and English' },
    ],
  },
  {
    title: 'Backend & Databases',
    tagline: 'APIs, schemas and the data layer behind them.',
    skills: [
      { name: 'Node.js', usedIn: 'Qevora POS, Store POS, ThesisGuard' },
      { name: 'Express.js', usedIn: 'Qevora POS, Store POS, ThesisGuard' },
      { name: 'PostgreSQL', usedIn: 'AgroBid Pakistan: bid rules enforced in Postgres' },
      { name: 'Supabase Realtime', usedIn: 'AgroBid Pakistan: live bids and countdowns' },
      { name: 'Prisma ORM', usedIn: 'AgroBid Pakistan' },
      { name: 'SQLite', usedIn: 'Qevora POS, Store POS' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    tagline: 'Containers, servers and the infrastructure they run on.',
    skills: [
      { name: 'AWS', usedIn: 'AgroBid Pakistan' },
      { name: 'Docker' }, // TODO: Mubashir to add where you used Docker (gives the chip a tooltip)
      { name: 'Linux', note: 'Daily driver: Zorin OS. Kali and Ubuntu VMs for security labs' },
      { name: 'Offline-first PWAs', usedIn: 'Asaan Udhaar, AgroBid Pakistan' },
    ],
  },
  {
    title: 'AI & APIs',
    tagline: 'Wiring AI models and third-party APIs into real workflows.',
    skills: [
      { name: 'Gemini API', usedIn: 'AgroBid Pakistan (listing screening, CNIC checks), ThesisGuard' },
      { name: 'RAG & embeddings', usedIn: 'Local RAG Assistant: MiniLM + ChromaDB' },
      { name: 'PyTorch', usedIn: 'Local RAG Assistant: transformer blocks written by hand' },
      { name: 'TensorFlow / Keras', usedIn: 'Animal Classifier AI: 98.8% validation accuracy' },
      { name: 'Streaming (SSE)', usedIn: 'Local RAG Assistant: tokens stream to the browser' },
    ],
  },
  {
    title: 'Deployment & CI/CD',
    tagline: 'Getting code from a commit to production, automatically.',
    skills: [
      { name: 'Vercel', usedIn: 'AgroBid Pakistan, Asaan Udhaar, DevEverTools, Qevora Technologies' },
      { name: 'GitHub Actions', usedIn: 'This portfolio: builds and deploys on every push' },
      { name: 'GitHub Pages', usedIn: 'This portfolio' },
      { name: 'Git & GitHub', usedIn: 'Every project here' },
      { name: 'Electron & Capacitor', usedIn: 'Qevora POS on Windows and Android' },
    ],
  },
  {
    title: 'Security',
    tagline: 'Auth, access control, and keeping secrets secret.',
    skills: [
      { name: 'Cybersecurity', usedIn: 'Cybersecurity internship at DPO' },
      { name: 'Auth & JWT', usedIn: 'Store POS (JWT logins), AgroBid Pakistan (OTP verification)' },
      { name: 'Role-based access', usedIn: 'Qevora POS staff permissions' },
      { name: 'Signed licence keys', usedIn: 'Qevora POS: Ed25519 signatures' },
      { name: 'Identity checks', usedIn: 'AgroBid Pakistan: CNIC photo checks for verified sellers' },
      { name: 'Input validation', usedIn: 'AgroBid Pakistan: bid rules enforced in the database' },
    ],
  },
];
