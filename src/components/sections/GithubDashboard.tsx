import { getRepositories, getRecentActivity } from "@/lib/github";
import { GitCommit, GitPullRequest, GitFork, Star } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const langColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  default: "#8B5CF6",
};

export default async function GithubDashboard() {
  const [repos, activity] = await Promise.all([
    getRepositories(),
    getRecentActivity(),
  ]);

  return (
    <section id="github" className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="section-label block mb-4">Open Source</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #6D28D9, #8B5CF6)" }}
              >
                <GithubIcon />
              </span>
              GitHub Activity
            </h2>
          </div>
          <a
            href="https://github.com/UmeshCode1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium group self-start md:self-auto"
          >
            View Profile
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Repos — span 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm text-text-secondary uppercase tracking-widest font-medium mb-6">Recent Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos?.slice(0, 4).map((repo: any) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors text-sm leading-snug">
                      {repo.name}
                    </h4>
                    <span className="flex items-center gap-1 text-xs text-text-secondary shrink-0">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 flex-1 leading-relaxed">
                    {repo.description || "A GitHub repository."}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary mt-auto">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: langColors[repo.language] || langColors.default }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                    <span className="text-text-secondary/50 text-[10px] ml-auto">
                      {new Date(repo.updated_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-4">
            <h3 className="text-sm text-text-secondary uppercase tracking-widest font-medium mb-6">Recent Activity</h3>
            <div className="glass-card rounded-xl p-5 space-y-5 max-h-[340px] overflow-y-auto">
              {activity?.slice(0, 8).map((event: any) => {
                const isPush = event.type === "PushEvent";
                const isPR = event.type === "PullRequestEvent";
                return (
                  <div key={event.id} className="flex gap-3 items-start">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: isPush ? "rgba(139,92,246,0.15)" : isPR ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {isPush
                        ? <GitCommit className="w-3.5 h-3.5 text-primary" />
                        : isPR
                        ? <GitPullRequest className="w-3.5 h-3.5 text-accent" />
                        : <GitCommit className="w-3.5 h-3.5 text-text-secondary" />
                      }
                    </div>
                    <div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        <span className="capitalize">{event.type.replace("Event", "")}</span>
                        {" on "}
                        <a href={`https://github.com/${event.repo.name}`} target="_blank" className="text-primary hover:underline">
                          {event.repo.name.split("/")[1]}
                        </a>
                      </p>
                      <span className="text-[10px] text-text-secondary">
                        {new Date(event.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
