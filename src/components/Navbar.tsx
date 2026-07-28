"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">

        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-wide text-white transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          aria-label="Mubashir - Home"
        >
          MUBASHIR
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
          <a href="#about" className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1">
            About
          </a>

          <a href="#skills" className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1">
            Skills
          </a>

          <a href="#projects" className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1">
            Projects
          </a>

          <a href="#contact" className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Desktop Resume */}
          <a
            href="/Mubashir_Fayyaz_Resume.pdf"
            download
            className="hidden rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Resume
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div 
          className="fixed top-24 left-4 right-4 z-[100] rounded-2xl border border-white/10 bg-zinc-900/95 p-6 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >

          <div className="flex flex-col gap-6">

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            >
              About
            </a>

            <a
              href="#skills"
              onClick={() => setOpen(false)}
              className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            >
              Skills
            </a>

            <a
              href="#projects"
              onClick={() => setOpen(false)}
              className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            >
              Projects
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-gray-300 transition hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
            >
              Contact
            </a>

            <a
              href="/Mubashir_Fayyaz_Resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Download Resume
            </a>

          </div>
        </div>
      )}
    </header>
  );
}