import Link from "next/link";
import { LayoutDashboard, FolderKanban, Code2, Settings, Mail, Terminal, Briefcase } from "lucide-react";
import { signout } from "@/app/auth/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden">
      {/* Scanline background for admin */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-primary/20 bg-black/40 backdrop-blur-md p-6 flex flex-col gap-6 z-10">
        <div className="flex items-center gap-2 text-xl font-heading font-bold text-white uppercase tracking-wider relative before:content-[''] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
          <Terminal className="w-6 h-6 text-primary" />
          <span>SYS_ADMIN</span>
        </div>
        
        <nav className="flex flex-col gap-2 font-mono text-sm">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/10 text-white/70 hover:text-primary transition-all group">
            <LayoutDashboard className="w-4 h-4 group-hover:animate-pulse" />
            <span>[OVERVIEW]</span>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/10 text-white/70 hover:text-primary transition-all group">
            <FolderKanban className="w-4 h-4 group-hover:animate-pulse" />
            <span>[PROJECTS]</span>
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-4 py-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/10 text-white/70 hover:text-primary transition-all group">
            <Briefcase className="w-4 h-4 group-hover:animate-pulse" />
            <span>[EXPERIENCE]</span>
          </Link>
          <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/10 text-white/70 hover:text-primary transition-all group">
            <Mail className="w-4 h-4 group-hover:animate-pulse" />
            <span>[MESSAGES]</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/10 text-white/70 hover:text-primary transition-all group">
            <Settings className="w-4 h-4 group-hover:animate-pulse" />
            <span>[SETTINGS]</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-10">
        {/* Topbar */}
        <header className="h-16 border-b border-primary/20 bg-black/40 backdrop-blur-md flex items-center justify-end px-6">
          <form>
            <button formAction={signout} type="submit" className="text-xs font-mono text-accent hover:text-white transition-colors flex items-center gap-2 border border-accent/30 px-3 py-1 bg-accent/10 hover:bg-accent hover:text-black">
              &gt; TERMINATE_SESSION
            </button>
          </form>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
