"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const roles = ["AI Engineer", "ML Developer", "Full-Stack Builder", "Intelligent Systems"];

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Atmospheric background orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(109, 40, 217, 0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "glow-pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "glow-pulse 5s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Floating particles */}
      <Particles />

      {/* Grid lines — very subtle */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-24 md:pt-0">

        {/* Left: Text Content */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="section-label flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-primary/60" />
              Hello, I&apos;m
            </span>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-3">
              Umesh{" "}
              <span className="gradient-text">Patel</span>
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg md:text-xl text-text-secondary font-sans">
                AI Engineer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-lg md:text-xl text-text-secondary font-sans">
                Intelligent Systems Builder
              </span>
            </div>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
              Designing intelligence.{" "}
              <span className="text-white/80">Building the future.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#projects"
              className="shimmer-btn group relative px-7 py-3.5 rounded-full font-medium text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="#contact"
              className="group px-7 py-3.5 rounded-full font-medium text-white/80 hover:text-white border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-3 text-text-secondary text-sm"
          >
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div
                className="w-1 h-2 rounded-full bg-primary"
                style={{ animation: "float 2s ease-in-out infinite" }}
              />
            </div>
            <span>Scroll Down</span>
          </motion.div>
        </div>

        {/* Right: Anime Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Glowing rings */}
          <div className="relative w-[340px] h-[440px] md:w-[480px] md:h-[580px]">
            <div
              className="absolute inset-[-20px] rounded-full opacity-30"
              style={{
                background: "radial-gradient(ellipse, rgba(109, 40, 217, 0.6) 0%, transparent 70%)",
                filter: "blur(30px)",
                animation: "glow-pulse 4s ease-in-out infinite",
              }}
            />

            {/* Decorative orbit ring */}
            <div
              className="absolute inset-[-30px] rounded-full border border-primary/20"
              style={{ animation: "spin-slow 25s linear infinite" }}
            />
            <div
              className="absolute inset-[-50px] rounded-full border border-accent/10"
              style={{ animation: "spin-slow 35s linear infinite reverse" }}
            />

            {/* Avatar */}
            <Image
              src="/images/anime_avatar_profile.png"
              alt="Umesh Patel"
              fill
              priority
              className="object-contain object-bottom z-10 relative drop-shadow-[0_20px_60px_rgba(109,40,217,0.5)]"
            />

            {/* Ground glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(109, 40, 217, 0.5) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Social Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
      >
        {[
          { icon: "GH", href: "https://github.com/UmeshCode1", label: "GitHub" },
          { icon: "LI", href: "https://linkedin.com/in/umeshpatel", label: "LinkedIn" },
          { icon: "@", href: "mailto:umeshpatel@example.com", label: "Email" },
        ].map((s) => (
          <Link
            key={s.icon}
            href={s.href}
            aria-label={s.label}
            className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 flex items-center justify-center text-[10px] font-mono text-white/50 hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
          >
            {s.icon}
          </Link>
        ))}
      </motion.div>
    </section>
  );
}

// Animated floating particles
function Particles() {
  const count = 20;
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: i % 3 === 0 ? "#A78BFA" : i % 3 === 1 ? "#EC4899" : "#818CF8",
            left: `${Math.random() * 100}%`,
            bottom: "0",
            opacity: Math.random() * 0.6 + 0.2,
            animation: `particle-move ${Math.random() * 8 + 8}s linear ${Math.random() * 6}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
