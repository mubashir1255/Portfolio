"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "e9d46f6d-269e-455a-a5b0-76effdfb7724";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("1255mubashir@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: formData.name,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Something went wrong. Please try emailing me directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your internet connection or email directly."
      );
    }
  };

  return (
    <section id="contact" className="relative z-10 bg-black px-6 py-28 text-white overflow-hidden">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[400px] w-[700px] rounded-full bg-blue-600/5 blur-[140px] translate-y-20" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Get In Touch
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="inline-block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 bg-clip-text text-transparent box-decoration-clone">
              Amazing
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Have a project in mind, looking for a full stack developer, or just want to connect?
            Drop a message below and I&apos;ll get back to you promptly.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between space-y-8 lg:col-span-5"
          >
            {/* Status Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="font-semibold text-emerald-400">
                  Available for Opportunities
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Actively seeking full-time junior positions, software engineering internships,
                and freelance full-stack projects.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-4">
              {/* Email Card with Copy Button */}
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:border-blue-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <a
                        href="mailto:1255mubashir@gmail.com"
                        className="text-sm font-medium text-white transition hover:text-blue-400"
                      >
                        1255mubashir@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-white">
                    Pakistan · Available for Worldwide Remote
                  </p>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Response Time</p>
                  <p className="text-sm font-medium text-white">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Connect on Socials
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="https://github.com/mubashir1255"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-300 transition duration-300 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="GitHub Profile"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mubashir-fayyaz-48b4b32b9"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-300 transition duration-300 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="LinkedIn Profile"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/mubashirfayyaz.1"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-300 transition duration-300 hover:border-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Instagram Profile"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl lg:col-span-7"
          >
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">Send Me a Message</h3>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Fill in your details below and your message will be forwarded directly to my inbox.
            </p>

            {status === "success" ? (
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center backdrop-blur-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="mt-4 text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="mt-2 text-sm text-gray-300">
                  Thank you for reaching out. I have received your message and will reply to your email as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Honeypot for spam */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {status === "error" && (
                  <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-200">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                    <div>
                      <p className="font-semibold text-rose-300">Submission Failed</p>
                      <p className="mt-0.5">{errorMessage}</p>
                      <a
                        href="mailto:1255mubashir@gmail.com"
                        className="mt-2 inline-block font-medium text-blue-400 underline hover:text-blue-300"
                      >
                        Click here to email me directly instead
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-gray-500 transition duration-300 focus:border-blue-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Email Address <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-gray-500 transition duration-300 focus:border-blue-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship / Freelance Project / Tech Discussion"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-gray-500 transition duration-300 focus:border-blue-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Your Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Mubashir, I would like to discuss..."
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-gray-500 transition duration-300 focus:border-blue-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}