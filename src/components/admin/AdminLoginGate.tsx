import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

const ADMIN_PASS_KEY = "ak-admin-auth";
const ADMIN_USER = "kalpeshattarde";
const ADMIN_PASS = "attarde@2468";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_PASS_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_PASS_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_PASS_KEY);
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
}

interface AdminLoginGateProps {
  children: React.ReactNode;
}

export default function AdminLoginGate({ children }: AdminLoginGateProps) {
  const { authenticated, login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (authenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!login(username, password)) {
      setError("Incorrect credentials. Please try again.");
      setPassword("");
    }
  };

  return (
    <main className="pt-28 pb-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="font-poppins text-xl font-bold text-foreground text-center mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Enter your admin credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              autoFocus
            />
            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full btn-primary justify-center gap-2"
              disabled={!username.trim() || !password.trim()}
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
