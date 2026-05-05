"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  order_index: number;
};

const icons = ["🏛️", "🧠", "🎯"];
const colors = ["#8B5CF6", "#4F46E5", "#EC4899"];

export default function ExperienceClient({ experiences }: { experiences: ExperienceItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" ref={ref} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 right-[-10%] w-[600px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-4">05. Journey</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Experience &amp; <span className="gradient-text">Leadership</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {/* Timeline dot + icon */}
                <div className="hidden md:flex justify-center mb-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 relative z-10"
                    style={{
                      background: `${colors[i % colors.length]}15`,
                      borderColor: `${colors[i % colors.length]}40`,
                      boxShadow: `0 0 20px ${colors[i % colors.length]}30`,
                    }}
                  >
                    {icons[i % icons.length]}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <span
                    className="text-xs font-mono font-semibold mb-3 block px-2.5 py-1 rounded-full w-fit"
                    style={{
                      color: colors[i % colors.length],
                      background: `${colors[i % colors.length]}15`,
                    }}
                  >
                    {exp.period}
                  </span>

                  <h3 className="text-white font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">@ {exp.company}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium text-text-secondary bg-white/5 border border-white/8"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
