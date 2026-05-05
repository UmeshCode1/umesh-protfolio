import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { deleteExperience } from "./actions";

export default async function AdminExperience() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: experiences, error } = await supabase
    .from("experience")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-primary/20 pb-4">
        <div>
          <h1 className="text-2xl font-mono text-primary font-bold mb-1 tracking-widest uppercase">&lt;SYSTEM_EXPERIENCE&gt;</h1>
          <p className="text-white/50 text-sm font-mono">[MANAGE_PROFESSIONAL_TIMELINE]</p>
        </div>
        <Link 
          href="/admin/experience/new" 
          className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all font-mono text-sm uppercase tracking-wider"
        >
          [+] ADD_ENTRY
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
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Role/Company</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Period</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Skills</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!experiences || experiences.length === 0) ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                  // NO_DATA_FOUND
                </td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-primary/10 last:border-0 hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white group-hover:text-primary transition-colors">{exp.role}</div>
                    <div className="text-white/50 text-xs">@ {exp.company}</div>
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    [{exp.period}]
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {exp.skills && exp.skills.slice(0, 3).map((s: string) => (
                        <span key={s} className="px-1.5 py-0.5 bg-white/5 text-[10px] text-white/50 border border-white/10">
                          {s}
                        </span>
                      ))}
                      {exp.skills && exp.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-white/5 text-[10px] text-white/50 border border-white/10">
                          +{exp.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form action={deleteExperience.bind(null, exp.id)}>
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
