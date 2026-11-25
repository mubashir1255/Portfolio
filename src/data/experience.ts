/** Chapter 01. Don't invent responsibilities: fill the TODOs with what you actually did. */
export interface Job {
  role: string;
  org: string;
  kind: string;
  dates: string;
  location: string;
  points: string[];
}

export const experience: Job[] = [
  {
    role: 'Cybersecurity Intern',
    org: 'DPO (Digital Portal Official)',
    kind: 'Internship',
    dates: 'TODO: Mubashir to fill (start – present)',
    location: 'TODO: Mubashir to fill (on-site / remote)',
    points: [
      'TODO: Mubashir to fill — main thing you work on',
      'TODO: Mubashir to fill — a tool, process or system you used or improved',
      'TODO: Mubashir to fill — a result or something you learned',
    ],
  },
];
