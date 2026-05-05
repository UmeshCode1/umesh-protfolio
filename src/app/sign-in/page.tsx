import { login, loginWithOAuth } from '@/app/auth/actions'
import { Code2, Mail } from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams;

  const loginWithGithub = loginWithOAuth.bind(null, 'github')
  const loginWithGoogle = loginWithOAuth.bind(null, 'google')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
            <Code2 size={24} />
          </div>
          <h1 className="text-2xl font-space font-bold text-center">Admin Login</h1>
          <p className="text-white/60 text-center text-sm">
            Sign in to manage your portfolio
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white/80" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white/80" htmlFor="password">
              Password
            </label>
            <input
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary-500 transition-colors"
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            formAction={login}
            className="mt-4 bg-primary-600 hover:bg-primary-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            Sign In with Email
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#121212] px-2 text-white/50">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <form>
            <button
              formAction={loginWithGithub}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-3"
            >
              <GithubIcon className="w-5 h-5" />
              GitHub
            </button>
          </form>

          <form>
            <button
              formAction={loginWithGoogle}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </form>
        </div>
        
        {message && (
          <p className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
