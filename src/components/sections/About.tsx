"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  { year: "2021", title: "The Beginning", desc: "Started exploring AI & ML and fell in love with it." },
  { year: "2022", title: "Deep Learning", desc: "Built projects, learned and kept building." },
  { year: "2023", title: "Leadership", desc: "Became VP of AIML Club and led amazing people." },
  { year: "2024", title: "Building Impact", desc: "Working on real-world solutions and products." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="origin" ref={ref} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-[-20%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-4">02. Origin</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Where It <span className="gradient-text">Began</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Curiosity has always driven me to explore how technology can solve real-world problems. My journey into{" "}
              <span className="text-primary-light font-medium">Artificial Intelligence and Machine Learning</span>{" "}
              began with a simple question — can machines think and learn like humans?
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Since then, I have been focused on building intelligent systems that are not just technically strong but also{" "}
              <span className="text-white font-medium">meaningful in real-world applications</span>. I believe the future belongs to those who combine intelligence with creativity.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Today, I build intelligent systems that solve real problems and create meaningful impact.{" "}
              <span className="text-white font-medium">The future is not something we wait for. It's something we build.</span>
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full border border-primary/30 text-primary-light hover:bg-primary/10 hover:border-primary/60 transition-all font-medium text-sm"
            >
              Know More About Me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  className="flex gap-8 items-start"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 w-16 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_rgba(139,92,246,0.6)] z-10" />
                  </div>

                  <div className="pb-2">
                    <span className="text-primary font-mono text-sm font-bold mb-1 block">{item.year}</span>
                    <h4 className="text-white font-heading font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
