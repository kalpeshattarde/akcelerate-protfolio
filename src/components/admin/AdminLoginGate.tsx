import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

export type AdminRole = "super_admin" | "manager" | "editor";

export interface AdminUser {
  username: string;
  role: AdminRole;
}

interface AdminAccount {
  username: string;
  password: string;
  role: AdminRole;
}

const ADMIN_PASS_KEY = "ak-admin-auth";
const ADMIN_ROLE_KEY = "ak-admin-role";
const ADMIN_USER_KEY = "ak-admin-user";

const ADMIN_ACCOUNTS: AdminAccount[] = [
  { username: "kalpeshattarde", password: "attarde@2468", role: "super_admin" },
  { username: "manager", password: "manager@1234", role: "manager" },
  { username: "editor", password: "editor@1234", role: "editor" },
];

// Permission map: which tabs each role can access
export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["dashboard", "analytics", "users", "orders", "content", "email", "products", "config", "affiliates", "growth", "ads", "activity"],
  manager: ["dashboard", "analytics", "users", "orders", "content", "email", "products", "activity"],
  editor: ["dashboard", "content", "products", "activity"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  manager: "Manager",
  editor: "Editor",
};

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(ADMIN_PASS_KEY) === "true"; } catch { return false; }
  });

  const [role, setRole] = useState<AdminRole>(() => {
    try { return (sessionStorage.getItem(ADMIN_ROLE_KEY) as AdminRole) || "editor"; } catch { return "editor"; }
  });

  const [currentUser, setCurrentUser] = useState<string>(() => {
    try { return sessionStorage.getItem(ADMIN_USER_KEY) || ""; } catch { return ""; }
  });

  const login = (username: string, password: string): boolean => {
    const account = ADMIN_ACCOUNTS.find(a => a.username === username && a.password === password);
    if (account) {
      sessionStorage.setItem(ADMIN_PASS_KEY, "true");
      sessionStorage.setItem(ADMIN_ROLE_KEY, account.role);
      sessionStorage.setItem(ADMIN_USER_KEY, account.username);
      setAuthenticated(true);
      setRole(account.role);
      setCurrentUser(account.username);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_PASS_KEY);
    sessionStorage.removeItem(ADMIN_ROLE_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    setAuthenticated(false);
  };

  const hasPermission = (tab: string) => ROLE_PERMISSIONS[role]?.includes(tab) ?? false;

  return { authenticated, login, logout, role, currentUser, hasPermission };
}

interface AdminLoginGateProps {
  children: React.ReactNode;
}

export default function AdminLoginGate({ children }: AdminLoginGateProps) {
  const { authenticated, login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (authenticated) return <>{children}</>;

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
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" autoFocus />
            <div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full btn-primary justify-center gap-2" disabled={!username.trim() || !password.trim()}>
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center mb-2">Demo Accounts</p>
            <div className="space-y-1">
              {ADMIN_ACCOUNTS.map(a => (
                <button key={a.username} onClick={() => { setUsername(a.username); setPassword(a.password); }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs hover:bg-muted/60 transition-colors">
                  <span className="text-muted-foreground">{a.username}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    a.role === "super_admin" ? "bg-red-500/10 text-red-600" :
                    a.role === "manager" ? "bg-amber-500/10 text-amber-600" :
                    "bg-primary/10 text-primary"
                  }`}>{ROLE_LABELS[a.role]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
