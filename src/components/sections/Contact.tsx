"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useActionState } from "react";
import { submitContact } from "@/app/contact/actions";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const initialState: { error?: string; success?: boolean } = {};

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <section id="contact" className="relative w-full py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-4">06. Connect</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Let&apos;s Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Open to exciting opportunities and collaborations. Whether you have a project idea or just want to say hi — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <a
                href="mailto:umesh.code1@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <Mail className="w-5 h-5 text-primary-light" />
                </div>
                <span className="text-text-secondary group-hover:text-white transition-colors">umesh.code1@gmail.com</span>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-light" />
                </div>
                <span className="text-text-secondary">India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6 border-t border-white/8">
              <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/UmeshCode1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/30 hover:-translate-y-1 transition-all"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/umesh-patel-5647b42a4"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/40 hover:-translate-y-1 transition-all"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:umesh.code1@gmail.com"
                  aria-label="Email"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 hover:-translate-y-1 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Download Resume */}
            <div>
              <a
                href="/resume.pdf"
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-text-secondary hover:text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {state?.success ? (
              <div className="glass-card rounded-2xl flex flex-col items-center justify-center gap-4 p-12 min-h-[300px]">
                <CheckCircle className="w-16 h-16 text-primary" />
                <h3 className="text-xl font-heading font-bold text-white">Message Sent!</h3>
                <p className="text-text-secondary text-center text-sm">Thank you for reaching out. I&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form action={formAction} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-text-secondary mb-2 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Umesh Patel"
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-text-secondary mb-2 uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs text-text-secondary mb-2 uppercase tracking-wider">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all text-sm resize-none"
                  />
                </div>

                {state?.error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {state.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="shimmer-btn w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white transition-all disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
                  }}
                >
                  {pending ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
