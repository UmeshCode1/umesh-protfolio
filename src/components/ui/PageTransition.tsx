"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
