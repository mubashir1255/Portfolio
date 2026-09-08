"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Sparkles,
  Rocket,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: typeof Code2;
  gradient: string;
  borderHover: string;
  tagline: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend & Full Stack",
    icon: Code2,
    gradient: "from-blue-500 via-cyan-400 to-blue-300",
    borderHover: "hover:border-blue-500/40 hover:shadow-blue-500/10",
    tagline: "Building responsive, accessible, high-performance web applications with end-to-end type safety.",
    skills: [
      "Next.js (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Responsive UI/UX",
    ],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    icon: Database,
    gradient: "from-cyan-400 to-teal-400",
    borderHover: "hover:border-teal-500/40 hover:shadow-teal-500/10",
    tagline: "Engineering resilient REST APIs, relational schemas, real-time sync, and scalable database layers.",
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "RESTful APIs",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Computing & DevOps",
    icon: Cloud,
    gradient: "from-blue-400 to-indigo-500",
    borderHover: "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
    tagline: "Containerizing services, managing cloud infrastructure, and automating deployment environments.",
    skills: [
      "Cloud Computing",
      "AWS (S3 & EC2)",
      "Docker",
      "Linux Server Admin",
      "Microservices",
      "Scalable Architectures",
    ],
  },
  {
    id: "ai",
    title: "AI Automation & API Integration",
    icon: Sparkles,
    gradient: "from-violet-500 to-blue-500",
    borderHover: "hover:border-violet-500/40 hover:shadow-violet-500/10",
    tagline: "Leveraging generative AI models, webhook pipelines, and seamless 3rd-party integrations.",
    skills: [
      "AI Automation",
      "Gemini API",
      "API Integration",
      "Webhooks & Automation",
      "LLM Tool Calling",
      "Workflow Pipelines",
    ],
  },
  {
    id: "deployment",
    title: "Deployment & CI/CD",
    icon: Rocket,
    gradient: "from-sky-400 to-blue-600",
    borderHover: "hover:border-sky-500/40 hover:shadow-sky-500/10",
    tagline: "Automating testing, build systems, and zero-downtime production releases across platforms.",
    skills: [
      "Vercel Deployment",
      "GitHub Actions (CI/CD)",
      "GitHub Pages",
      "Git Version Control",
      "Static & SSR Hosting",
      "Domain Configuration",
    ],
  },
  {
    id: "security",
    title: "Cybersecurity & Web Defense",
    icon: ShieldCheck,
    gradient: "from-emerald-400 to-cyan-500",
    borderHover: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    tagline: "Hardening endpoints, securing user authentication, and protecting applications against vulnerabilities.",
    skills: [
      "Cybersecurity Basics",
      "Authentication & JWT",
      "Role-Based Access (RBAC)",
      "API Security & CORS",
      "Environment Protection",
      "Input Validation & Sanity",
    ],
  },
];

const filterTabs = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & Supabase" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI & APIs" },
  { id: "deployment", label: "Deployment" },
  { id: "security", label: "Cybersecurity" },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="relative z-10 bg-black px-6 py-28 text-white overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[450px] w-[750px] rounded-full bg-cyan-500/5 blur-[150px] translate-y-20" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Skills & Expertise
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Technical{" "}
            <span className="inline-block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent box-decoration-clone">
              Stack
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            A comprehensive overview of technologies, tools, and practices I use
            to build robust, secure, and production-ready applications.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:border-blue-500/30 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          layout
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  layout
                  key={category.id}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${category.borderHover}`}
                >
                  <div>
                    {/* Header: Icon + Title */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                      {category.tagline}
                    </p>
                  </div>

                  {/* Skills Badges */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-gray-300 transition duration-300 hover:border-blue-500/40 hover:text-white"
                        >
                          <CheckCircle2 className="h-3 w-3 text-blue-400 shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Quick Highlights Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Primary Tooling & Infrastructure
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "PostgreSQL",
              "Supabase",
              "Docker",
              "AWS",
              "Gemini AI",
              "GitHub Actions",
              "Vercel",
              "Cybersecurity",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-800 bg-zinc-900/90 px-4 py-1.5 text-xs font-semibold text-gray-300 transition duration-300 hover:border-blue-500 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}