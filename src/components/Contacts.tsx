"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-bold"
        >
          Let&apos;s Build Something Amazing
        </motion.h2>

        <p className="mt-6 text-lg text-gray-400">
          I&apos;m always interested in internships, freelance work,
          collaborations, and exciting projects.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <a
            href="mailto:1255mubashir@email.com"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Send an email to Mubashir"
          >
            Email Me
          </a>

          <a
            href="https://github.com/mubashir1255"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Visit GitHub profile"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>

        </div>

      </div>
    </section>
  );
}