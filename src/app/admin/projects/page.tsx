import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { deleteProject } from "./actions";

export default async function AdminProjects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-primary/20 pb-4">
        <div>
          <h1 className="text-2xl font-mono text-primary font-bold mb-1 tracking-widest uppercase">&lt;SYSTEM_PROJECTS&gt;</h1>
          <p className="text-white/50 text-sm font-mono">[MANAGE_PORTFOLIO_ARCHIVES]</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all font-mono text-sm uppercase tracking-wider"
        >
          [+] ADD_PROJECT
        </Link>
      </div>

      <div className="border border-primary/20 bg-black/40 backdrop-blur-md overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />

        <table className="w-full text-left font-mono text-sm">
          <thead className="bg-primary/5 border-b border-primary/20 text-primary/80">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!projects || projects.length === 0) ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                  // NO_DATA_FOUND
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj.id} className="border-b border-primary/10 last:border-0 hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-white group-hover:text-primary transition-colors">{proj.title}</td>
                  <td className="px-6 py-4">
                    {proj.featured ? (
                      <span className="px-2 py-1 bg-accent/20 border border-accent/50 text-accent text-[10px] tracking-wider uppercase">Featured</span>
                    ) : (
                      <span className="px-2 py-1 bg-white/5 border border-white/10 text-white/50 text-[10px] tracking-wider uppercase">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/50 text-xs">
                    [{new Date(proj.created_at).toLocaleDateString()}]
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form action={deleteProject.bind(null, proj.id)}>
                      <button 
                        type="submit" 
                        className="text-accent/70 hover:text-accent transition-colors font-bold tracking-widest"
                      >
                        [DELETE]
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
