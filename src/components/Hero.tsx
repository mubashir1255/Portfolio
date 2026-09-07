"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black pt-24 text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-blue-400 uppercase tracking-[0.3em] font-semibold">
          Welcome
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
          Hello, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Mubashir
          </span>{" "}
          
        </h1>

        <h2 className="mt-6 text-xl text-gray-300 sm:text-2xl">
          IT Student • Full Stack Developer • Cloud Enthusiast
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          I build fast, scalable, and modern web applications using Next.js,
          React, TypeScript, Docker, PostgreSQL, and AWS. I&apos;m passionate
          about creating software that solves real-world problems while
          continuously learning new technologies.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button 
            className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Scroll to projects"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
          </button>

          <button 
            className="rounded-xl border border-gray-600 px-7 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Scroll to contact section"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-gray-400">
          <a
            href="https://github.com/mubashir1255"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/mubashir-fayyaz-48b4b32b9"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/mubashirfayyaz.1"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            aria-label="Instagram Profile"
          >
            Instagram
          </a>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Docker",
            "AWS",
            "PostgreSQL",
            "Prisma",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-700 bg-white/5 px-4 py-2 text-sm text-gray-300 transition duration-300 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}