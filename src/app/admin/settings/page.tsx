import { User, Key, Globe, ShieldCheck } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-space font-bold mb-2">Settings</h1>
        <p className="text-white/60">Manage your portfolio configuration.</p>
      </div>

      {/* Profile Info */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-space font-semibold">Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/50 mb-1">Name</p>
            <p className="text-white font-medium">Umesh Patel</p>
          </div>
          <div>
            <p className="text-white/50 mb-1">GitHub</p>
            <a href="https://github.com/UmeshCode1" target="_blank" className="text-accent hover:underline">
              @UmeshCode1
            </a>
          </div>
        </div>
      </div>

      {/* Environment Keys Status */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-space font-semibold">API Keys Status</h2>
        </div>
        <div className="space-y-3 text-sm">
          {[
            { label: "Supabase URL", key: "NEXT_PUBLIC_SUPABASE_URL" },
            { label: "Supabase Anon Key", key: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
            { label: "GitHub Access Token", key: "GITHUB_ACCESS_TOKEN" },
            { label: "Gemini API Key", key: "GEMINI_API_KEY" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-white/70">{item.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                process.env[item.key]
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {process.env[item.key] ? "Configured" : "Missing"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Site Info */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-highlight" />
          <h2 className="text-lg font-space font-semibold">Site Links</h2>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="/" target="_blank" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            → View Portfolio
          </a>
          <a href="/blog" target="_blank" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            → View Blog
          </a>
          <a href="https://supabase.com/dashboard/project/laohbwwujtkkponacfho" target="_blank" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            → Supabase Dashboard
          </a>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-yellow-300 font-medium mb-1">Security Note</p>
          <p className="text-white/60">
            All admin routes are protected by Supabase Auth middleware. Only authenticated users can access this panel.
            Never share your API keys publicly.
          </p>
        </div>
      </div>
    </div>
  );
}
