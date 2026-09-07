"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Code2, Cloud, BrainCircuit, Rocket } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const highlights = [
  {
    icon: Code2,
    title: "Full Stack",
    text: "Next.js · React · TypeScript",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Docker · AWS · Linux",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    text: "Gemini API · AI Projects",
    gradient: "from-violet-500 to-blue-500",
  },
  {
    icon: Rocket,
    title: "Goal",
    text: "Software Engineer",
    gradient: "from-blue-400 to-indigo-500",
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Projects Built" },
  { value: 12, suffix: "+", label: "Technologies" },
  { value: 2023, suffix: "", label: "Started Coding" },
  { value: 100, suffix: "%", label: "Passion" },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="relative z-10 bg-black py-32 text-white overflow-hidden">

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-blue-600/5 blur-[120px] translate-y-40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Who I Am
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            About{" "}
            <span className="inline-block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent box-decoration-clone">
              Me
            </span>
          </h2>

          {/* Accent line */}
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </motion.div>

        {/* ── Bio ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-gray-400"
        >
          I&apos;m an IT student passionate about building{" "}
          <span className="text-white font-medium">beautiful, scalable applications</span>{" "}
          that solve real-world problems. My interests span full‑stack development,
          cloud computing, AI integration, and DevOps.
        </motion.p>

        {/* ── Highlight Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-sm overflow-hidden cursor-default"
              >
                {/* Card glow on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} blur-2xl`}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 bg-gradient-to-br from-white to-transparent" />

                {/* Icon with gradient bg */}
                <div
                  className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="relative text-lg font-bold text-white">{item.title}</h3>
                <p className="relative mt-2 text-sm text-gray-400 leading-6">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid grid-cols-2 gap-px rounded-2xl border border-white/[0.07] bg-white/[0.07]
                     overflow-hidden md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-1 bg-black px-6 py-10
                         transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <span className="inline-block text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm text-gray-500 tracking-wide">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}