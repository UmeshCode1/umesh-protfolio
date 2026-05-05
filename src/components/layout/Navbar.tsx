"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Origin", href: "#origin" },
  { name: "Capabilities", href: "#skills" },
  { name: "Creations", href: "#projects" },
  { name: "Journey", href: "#experience" },
  { name: "Connect", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <Star className="w-6 h-6 text-primary group-hover:fill-primary transition-all duration-300" />
          <span className="font-heading font-bold text-xl tracking-wide text-white group-hover:text-primary transition-colors">
            Umesh Patel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-sans font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Let's Talk Button */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="shimmer-btn px-6 py-2.5 text-white rounded-full font-medium text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
              boxShadow: "0 0 20px rgba(139,92,246,0.35)",
            }}
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-white/10 flex flex-col items-center justify-center gap-8 overflow-hidden md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-semibold text-white/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-primary text-white rounded-full font-medium transition-all"
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
