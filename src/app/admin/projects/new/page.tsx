import { addProject } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-primary/20 pb-4">
        <div>
          <h1 className="text-2xl font-mono text-primary font-bold mb-1 tracking-widest uppercase">&lt;ADD_PROJECT&gt;</h1>
          <p className="text-white/50 text-sm font-mono">[INITIALIZE_NEW_ARCHIVE_ENTRY]</p>
        </div>
        <Link 
          href="/admin/projects" 
          className="px-4 py-2 border border-white/20 text-white/70 hover:bg-white/10 transition-all font-mono text-sm uppercase tracking-wider"
        >
          [RETURN]
        </Link>
      </div>

      <div className="border border-primary/20 bg-black/40 backdrop-blur-md p-8 relative">
        {/* Tech Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

        <form action={addProject} className="space-y-6 font-mono">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-primary/80 text-sm tracking-widest uppercase">Project_Title *</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="e.g. AI Portfolio System"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-primary/80 text-sm tracking-widest uppercase">System_Description *</label>
              <textarea 
                id="description" 
                name="description" 
                required 
                rows={4}
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors resize-y"
                placeholder="Describe the architecture and features..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tech_stack" className="block text-primary/80 text-sm tracking-widest uppercase">Tech_Stack (Comma Separated)</label>
              <input 
                type="text" 
                id="tech_stack" 
                name="tech_stack" 
                placeholder="Next.js, Tailwind, Supabase"
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="github_link" className="block text-primary/80 text-sm tracking-widest uppercase">GitHub_URL</label>
                <input 
                  type="url" 
                  id="github_link" 
                  name="github_link" 
                  className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="live_link" className="block text-primary/80 text-sm tracking-widest uppercase">Live_URL</label>
                <input 
                  type="url" 
                  id="live_link" 
                  name="live_link" 
                  className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="image_url" className="block text-primary/80 text-sm tracking-widest uppercase">Image_URL</label>
              <input 
                type="url" 
                id="image_url" 
                name="image_url" 
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="/images/projects/project1.png"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 pb-2">
              <input 
                type="checkbox" 
                id="featured" 
                name="featured" 
                className="w-5 h-5 rounded border-white/10 bg-black/20 text-primary accent-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium text-white/80 uppercase tracking-widest">
                [MARK_AS_FEATURED_NODE]
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-primary/20 flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black transition-all font-bold tracking-widest uppercase relative overflow-hidden group"
            >
              <span className="relative z-10">[EXECUTE_DEPLOY]</span>
              <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
