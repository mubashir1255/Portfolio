"use client";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-center text-gray-500">
      <p>
        © {new Date().getFullYear()} Mubashir. Built with Next.js, Tailwind CSS & Framer Motion.
      </p>
    </footer>
  );
}