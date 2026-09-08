"use client";

const timeline = [
  {
    year: "2023",
    title: "Started BS Information Technology",
    description:
      "Began learning programming, databases, networking, and software engineering.",
  },
  {
    year: "2024",
    title: "Explored Web Development",
    description:
      "Built projects using HTML, CSS, JavaScript, React and started learning Next.js.",
  },
  {
    year: "2025",
    title: "Cloud & Backend",
    description:
      "Learned Docker, AWS, PostgreSQL, Prisma and modern backend development.",
  },
  {
    year: "2026",
    title: "Built Qevora Technologies",
    description:
      "Built and launched the Qevora Technologies agency website while continuing to create production-ready full stack applications and preparing for internships and software engineering roles.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-zinc-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center text-5xl font-bold">
          My Journey
        </h2>

        <div className="space-y-10">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
            >
              <p className="font-semibold text-blue-400">
                {item.year}
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}