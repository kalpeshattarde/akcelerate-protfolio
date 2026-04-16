import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">(() => {
    // Skip preloader entirely if already seen this session
    if (typeof window !== "undefined" && sessionStorage.getItem("ak-preloader")) return "done";
    return "loading";
  });

  useEffect(() => {
    if (phase === "done") return;
    const t1 = setTimeout(() => setPhase("exit"), 600);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("ak-preloader", "1");
    }, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "hsl(var(--background))",
        transition: "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s ease",
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        opacity: phase === "exit" ? 0 : 1,
      }}
    >
      <div className="flex flex-col items-center gap-4 preloader-content">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center preloader-logo"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Activity className="w-8 h-8 text-primary-foreground" />
        </div>
        <span className="font-poppins font-bold text-2xl tracking-tight text-foreground">
          AK<span className="gradient-text">celerate</span>
        </span>
        <div className="w-48 h-1 rounded-full overflow-hidden bg-muted mt-2">
          <div className="preloader-bar h-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </div>
    </div>
  );
}
