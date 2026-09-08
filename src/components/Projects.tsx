"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const projects = [
  {
    title: "Developer Portfolio",
    description:
      "A modern portfolio built with Next.js, Tailwind CSS, Framer Motion, and TypeScript.",
    image: `${basePath}/projects/portfolio.png`,
    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
    github: "https://github.com/mubashir1255",
    demo: "#",
  },
  {
    title: "AgroBid Pakistan",
    description:
      "A real-time agriculture marketplace connecting farmers and buyers through live auctions.",
    image: `${basePath}/projects/portfolio.png`, // Replace later with agrobid.png
    tech: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
    github: "https://github.com/mubashir1255",
    demo: "#",
  },
  {
    title: "Qevora Technologies",
    description:
      "A polished agency website for Qevora Technologies, presenting its services, work, and full-stack digital solutions.",
    image: `${basePath}/projects/qevora-technologies.svg`,
    tech: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    github:
      "https://github.com/Qevora-Technologies/qevora-technologies.github.io",
    demo: "https://qevora-technologies.github.io/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-black py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-extrabold">
  Featured{" "}
  <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent box-decoration-clone">
    Projects
  </span>
</h2>

        <p className="mx-auto mt-5 max-w-2xl text-center text-gray-400">
          Some projects I&apos;ve built while learning full-stack development.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-4 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-gray-600 px-6 py-3 transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={`View ${project.title} live demo`}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}