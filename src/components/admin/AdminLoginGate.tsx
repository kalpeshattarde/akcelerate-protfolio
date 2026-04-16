import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

const ADMIN_PASS_KEY = "ak-admin-auth";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      const stored = sessionStorage.getItem(ADMIN_PASS_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  const login = (password: string): boolean => {
    const ADMIN_USER = "kalpeshattarde";
    const ADMIN_PASS = "attarde@2468";
    if (password === ADMIN_PASS) {
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (authenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!login(password)) {
      setError("Incorrect password. Please try again.");
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
          <p className="text-sm text-muted-foreground text-center mb-6">Enter the admin password to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                autoFocus
              />
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full btn-primary justify-center gap-2"
              disabled={!password.trim()}
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
