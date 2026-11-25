/** Chapter 04: the episodes. */
import { person } from './site';

export interface Episode {
  when: string;
  title: string;
  text: string;
}

export const episodes: Episode[] = [
  {
    when: '2023',
    title: `Joined ${person.degreeFull}`,
    text: 'Started at the University of Lahore and began programming fundamentals. TODO: Mubashir to confirm your first languages.',
  },
  {
    when: '2024',
    title: 'Found the web',
    text: 'HTML, CSS, JavaScript and React; started on Next.js.',
  },
  {
    when: '2025',
    title: 'Went down the stack',
    text: 'Docker, AWS, PostgreSQL, Prisma and backend development.',
  },
  {
    when: '2026',
    title: 'Shipped and joined a team',
    text: 'Launched the Qevora Technologies website. Became a Cybersecurity Intern at DPO.',
  },
  {
    when: 'Now',
    title: 'The current arc',
    text: 'Finishing AgroBid Pakistan, my final-year project, and open to junior roles, internships and freelance work.',
  },
];
