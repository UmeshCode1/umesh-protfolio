"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    id: "ai-ml",
    label: "AI / ML",
    icon: "🤖",
    color: "#8B5CF6",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 80 },
      { name: "NLP", level: 78 },
      { name: "Computer Vision", level: 75 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "⚙️",
    color: "#4F46E5",
    tools: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "PostgreSQL"],
    dots: [5, 4, 4, 4, 3, 4],
  },
  {
    id: "languages",
    label: "Languages",
    icon: "💻",
    color: "#EC4899",
    tools: ["Python", "C++", "JavaScript", "SQL", "HTML / CSS"],
    dots: [5, 4, 4, 4, 5],
  },
];

function SkillDots({ count, max = 5, color }: { count: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: i < count ? color : "rgba(255,255,255,0.1)",
            boxShadow: i < count ? `0 0 6px ${color}80` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 left-[-10%] w-[600px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-4">03. Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-6"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-white font-heading font-semibold text-lg">{cat.label}</h3>
              </div>

              {/* Progress Bars (AI/ML) */}
              {cat.skills && (
                <div className="space-y-5">
                  {cat.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + catIdx * 0.1 + i * 0.08 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text-secondary text-sm">{skill.name}</span>
                        <span className="text-primary-light text-xs font-mono">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Dot skills (Tools / Languages) */}
              {cat.tools && cat.dots && (
                <div className="space-y-4">
                  {cat.tools.map((tool, i) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + catIdx * 0.1 + i * 0.08 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-text-secondary text-sm">{tool}</span>
                      <SkillDots count={cat.dots![i]} color={cat.color} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-end mt-8"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium group"
          >
            View All Skills
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
