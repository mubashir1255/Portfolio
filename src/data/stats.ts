/** Hero stats. Each one is provable from the page itself, and computed from the data. */
import { projects } from './projects';
import { person } from './site';

const counted = projects.filter((p) => p.countInStats !== false);

export const stats = [
  { value: counted.length, label: 'projects', href: '#projects' },
  { value: counted.filter((p) => p.links.demo).length, label: 'live products', href: '#projects' },
  { value: person.codingSince, label: 'coding since' },
];
