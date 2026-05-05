import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6 md:px-12 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(109, 40, 217, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & copyright */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #6D28D9, #8B5CF6)" }}
          >
            U
          </div>
          <p className="text-text-secondary text-sm">
            © 2026 <span className="text-white font-medium">Umesh Patel</span>. All rights reserved.
          </p>
        </div>

        {/* Center nav */}
        <nav className="flex items-center gap-6 text-sm text-text-secondary">
          {["Home", "Origin", "Skills", "Projects", "Journey", "Connect"].map((item, i) => {
            const hrefs = ["#home", "#origin", "#skills", "#projects", "#experience", "#contact"];
            return (
              <Link
                key={item}
                href={hrefs[i]}
                className="hover:text-white transition-colors"
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Made with */}
        <p className="text-text-secondary text-sm flex items-center gap-1.5">
          Made with{" "}
          <span className="text-accent">❤</span>
          {" "}and lots of{" "}
          <span className="text-primary">☕</span>
        </p>
      </div>
    </footer>
  );
}
