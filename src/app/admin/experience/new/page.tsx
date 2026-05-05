import { createExperience } from "../actions";
import Link from "next/link";

export default function NewExperience() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-primary/20 pb-4">
        <div>
          <h1 className="text-2xl font-mono text-primary font-bold mb-1 tracking-widest uppercase">&lt;ADD_EXPERIENCE&gt;</h1>
          <p className="text-white/50 text-sm font-mono">[INITIALIZE_NEW_TIMELINE_NODE]</p>
        </div>
        <Link 
          href="/admin/experience" 
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

        <form action={createExperience} className="space-y-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="role" className="block text-primary/80 text-sm tracking-widest uppercase">Role_Title</label>
              <input
                type="text"
                id="role"
                name="role"
                required
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="e.g. Senior Developer"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="block text-primary/80 text-sm tracking-widest uppercase">Company_Name</label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="e.g. Tech Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="period" className="block text-primary/80 text-sm tracking-widest uppercase">Time_Period</label>
              <input
                type="text"
                id="period"
                name="period"
                required
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="e.g. 2021 - Present"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="order_index" className="block text-primary/80 text-sm tracking-widest uppercase">Display_Order</label>
              <input
                type="number"
                id="order_index"
                name="order_index"
                defaultValue={0}
                className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="block text-primary/80 text-sm tracking-widest uppercase">Tech_Stack (Comma Separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors"
              placeholder="React, Next.js, Tailwind..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-primary/80 text-sm tracking-widest uppercase">System_Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full bg-black/50 border border-white/10 focus:border-primary px-4 py-3 text-white outline-none transition-colors resize-y"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <div className="pt-4 border-t border-primary/20 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black transition-all font-bold tracking-widest uppercase relative overflow-hidden group"
            >
              <span className="relative z-10">[EXECUTE_INSERT]</span>
              <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
