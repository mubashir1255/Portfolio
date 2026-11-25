/** Hero stats. Each one is provable from the page itself, and computed from the data. */
import { projects } from './projects';
import { person } from './site';

export const stats = [
  { value: projects.length, label: 'projects', href: '#projects' },
  { value: projects.filter((p) => p.links.demo).length, label: 'live products', href: '#projects' },
  { value: person.codingSince, label: 'coding since' },
];
