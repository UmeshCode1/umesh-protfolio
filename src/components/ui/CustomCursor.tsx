"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Soft trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          opacity: hidden ? 0 : 0.6,
          scale: hovered ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.5 }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Sharp center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: hidden ? 0 : 1,
          scale: hovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 28 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: "#A78BFA",
            boxShadow: "0 0 8px rgba(167, 139, 250, 0.8)",
          }}
        />
      </motion.div>
    </>
  );
}
