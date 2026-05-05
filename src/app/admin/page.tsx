import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FolderKanban, Mail, BookOpen, Eye } from "lucide-react";

export default async function AdminOverview() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ count: projectCount }, { count: contactCount }, { count: unreadCount }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }).eq("read", false),
    ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectCount ?? 0,
      icon: FolderKanban,
      color: "text-primary-400",
      bg: "bg-primary-500/10",
      href: "/admin/projects",
    },
    {
      label: "Total Messages",
      value: contactCount ?? 0,
      icon: Mail,
      color: "text-accent",
      bg: "bg-accent/10",
      href: "/admin/contacts",
    },
    {
      label: "Unread Messages",
      value: unreadCount ?? 0,
      icon: Eye,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      href: "/admin/contacts",
    },
    {
      label: "Blog Posts",
      value: 1,
      icon: BookOpen,
      color: "text-green-400",
      bg: "bg-green-400/10",
      href: "/blog",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-mono">
      <div className="border-b border-primary/20 pb-4">
        <h1 className="text-2xl text-primary font-bold mb-1 tracking-widest uppercase">&lt;SYSTEM_OVERVIEW&gt;</h1>
        <p className="text-white/50 text-sm">[AUTHENTICATED_SESSION_ACTIVE]</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="group relative p-6 bg-black/40 border border-primary/20 hover:border-primary/50 transition-colors flex flex-col gap-4 overflow-hidden"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 group-hover:border-primary transition-colors" />

            <div className={`w-10 h-10 ${stat.bg} border border-white/5 flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">{stat.label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="pt-8">
        <h2 className="text-sm font-bold mb-4 text-primary uppercase tracking-widest">&lt;QUICK_EXECUTE&gt;</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/projects/new"
            className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black text-xs font-bold tracking-widest uppercase transition-all"
          >
            [+] NEW_PROJECT
          </a>
          <a
            href="/admin/experience/new"
            className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black text-xs font-bold tracking-widest uppercase transition-all"
          >
            [+] NEW_EXPERIENCE
          </a>
          <a
            href="/admin/contacts"
            className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/10 hover:border-white/50 text-xs font-bold tracking-widest uppercase transition-all"
          >
            [&gt;] READ_MESSAGES
          </a>
        </div>
      </div>
    </div>
  );
}
