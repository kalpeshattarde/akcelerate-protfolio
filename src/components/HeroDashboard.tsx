import { useState, useEffect, memo, forwardRef, useRef } from "react";

const tabs1 = ["🤖 Automation", "🧠 AI/ML", "📊 Analytics", "💻 SaaS"];
const tabs2 = ["📈 Data Viz", "☁️ Cloud", "🔄 MLOps", "🎯 Strategy"];
const steps = ["Audit", "Map", "Build", "Test", "Deploy"];

const terminalLines = [
  "$ ai_pipeline.run() → optimizing workflows...",
  "$ model.train() → accuracy: 94.7% ✓",
  "$ deploy --prod → services live ✓",
  "$ analytics.stream() → processing 12k events/s...",
  "$ automate.execute() → 58% time saved ✓",
];

const barHeights = [30, 45, 35, 55, 48, 65, 58, 72, 68, 80, 75, 92, 85, 70, 88, 95];

// Single RAF-driven chart using CSS transforms instead of per-bar state
function AnimatedChart({ animate }: { animate: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!animate || !containerRef.current) return;
    // Throttle to ~30fps for this decorative animation
    let lastTime = 0;
    const throttledTick = () => {
      const now = performance.now();
      if (now - lastTime >= 33) {
        lastTime = now;
        const t = Date.now();
        const bars = containerRef.current?.children;
        if (bars) {
          for (let i = 0; i < bars.length; i++) {
            const h = barHeights[i] + Math.sin(t / 800 + i * 0.7) * 12;
            (bars[i] as HTMLElement).style.height = `${Math.max(10, Math.min(98, h))}%`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(throttledTick);
    };

    rafRef.current = requestAnimationFrame(throttledTick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  return (
    <div ref={containerRef} className="flex items-end gap-1 h-full p-3 pb-2">
      {barHeights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${h}%`,
            background: `linear-gradient(180deg, ${i < 10 ? 'rgba(37,99,235,0.8)' : 'rgba(6,182,212,0.8)'}, rgba(37,99,235,0.2))`,
            opacity: 0.5 + (i / 32),
            willChange: "height",
          }}
        />
      ))}
    </div>
  );
}

function useTypingEffect(lines: string[], speed = 40, pauseDuration = 2000) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const line = lines[lineIndex];
    let charIndex = 0;
    setText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setText(line.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % lines.length);
        }, pauseDuration);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [lineIndex, lines, speed, pauseDuration]);

  return text;
}

const CountUpValue = forwardRef<HTMLSpanElement, { target: number; suffix?: string; prefix?: string }>(
  ({ target, suffix = "", prefix = "" }, ref) => {
    const [val, setVal] = useState(0);

    useEffect(() => {
      const duration = 1800;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setVal(target);
          clearInterval(interval);
        } else {
          setVal(Math.round(current * 10) / 10);
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, [target]);

    return <span ref={ref}>{prefix}{val % 1 === 0 ? val : val.toFixed(1)}{suffix}</span>;
  }
);
CountUpValue.displayName = "CountUpValue";

const HeroDashboard = memo(function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const terminalText = useTypingEffect(terminalLines, 35, 2500);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Cycle active tab
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle active step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "ROI", value: 315, suffix: "%", color: "#2563EB", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.15)", sub: "↑ avg client" },
    { label: "Automation", value: 58, suffix: "%", color: "#A78BFA", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.15)", sub: "time saved" },
    { label: "Accuracy", value: 94.7, suffix: "%", color: "#06B6D4", bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.15)", sub: "AI models" },
  ];

  return (
    <div
      className="hidden lg:block"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(8deg)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        perspective: "1000px",
      }}
    >
      <div className="dashboard-float">
        <div className="dashboard-mockup dashboard-glow">
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: "#0F172A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-2.5 h-2.5 rounded-full dashboard-dot-red" style={{ background: "#EF4444" }} />
            <div className="w-2.5 h-2.5 rounded-full dashboard-dot-yellow" style={{ background: "#F59E0B" }} />
            <div className="w-2.5 h-2.5 rounded-full dashboard-dot-green" style={{ background: "#10B981" }} />
            <span className="text-xs ml-3 font-mono" style={{ color: "#9CA3AF" }}>akcelerate.ai · services</span>
            <span className="ml-auto text-[10px] font-bold tracking-wide live-pulse" style={{ color: "#10B981" }}>● LIVE</span>
          </div>

          {/* Tab row 1 */}
          <div className="grid grid-cols-4 gap-[3px] px-2.5 pt-2.5 pb-1">
            {tabs1.map((t, i) => (
              <div
                key={i}
                className={`text-center py-1.5 rounded-md text-[9px] font-semibold cursor-pointer transition-all duration-500 ${activeTab === i ? "text-white" : "text-slate-400"}`}
                style={{
                  background: activeTab === i ? "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(6,182,212,0.3))" : "rgba(255,255,255,0.04)",
                  border: activeTab === i ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  transform: activeTab === i ? "scale(1.05)" : "scale(1)",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Tab row 2 */}
          <div className="grid grid-cols-4 gap-[3px] px-2.5 pb-2">
            {tabs2.map((t, i) => (
              <div
                key={i}
                className={`text-center py-1.5 rounded-md text-[9px] font-semibold cursor-pointer transition-all duration-500 ${activeTab === i + 4 ? "text-white" : "text-slate-400"}`}
                style={{
                  background: activeTab === i + 4 ? "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(6,182,212,0.3))" : "rgba(255,255,255,0.04)",
                  border: activeTab === i + 4 ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  transform: activeTab === i + 4 ? "scale(1.05)" : "scale(1)",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-[11px] font-bold text-white font-poppins">
              {[...tabs1, ...tabs2][activeTab]?.replace(/^.\s/, "")}
            </span>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ color: "#34D399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>● Active</span>
          </div>

          {/* Animated chart — single RAF instead of 16 intervals */}
          <div className="mx-3 mb-2 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.04)", height: "100px" }}>
            <AnimatedChart animate={isVisible} />
          </div>

          {/* Pipeline steps */}
          <div className="flex items-center gap-1 px-3 pb-2 overflow-hidden">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-1">
                <span
                  className={`text-[8px] font-semibold px-2 py-1 rounded-md transition-all duration-700 ${i <= activeStep ? 'text-white' : 'text-slate-500'}`}
                  style={{
                    background: i <= activeStep ? 'linear-gradient(135deg, rgba(37,99,235,0.4), rgba(6,182,212,0.3))' : 'rgba(255,255,255,0.04)',
                    border: '1px solid ' + (i <= activeStep ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)'),
                    transform: i === activeStep ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: i === activeStep ? '0 0 12px rgba(37,99,235,0.4)' : 'none',
                  }}
                >
                  {i < activeStep ? "✓" : ""} {step}
                </span>
                {i < 4 && <span className="text-slate-600 text-[8px]">›</span>}
              </div>
            ))}
          </div>

          {/* Metrics with count-up */}
          <div className="grid grid-cols-3 gap-1 px-3 pb-2">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-lg p-2 text-center metric-card-hover"
                style={{ background: m.bg, border: `1px solid ${m.border}`, transition: "all 0.3s ease" }}
              >
                <div className="text-[9px] mb-0.5" style={{ color: "#64748B" }}>{m.label}</div>
                <div className="text-sm font-bold font-poppins" style={{ color: m.color }}>
                  {isVisible ? <CountUpValue target={m.value} suffix={m.suffix} /> : "0%"}
                </div>
                <div className="text-[8px]" style={{ color: "#34D399" }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Terminal with typing effect */}
          <div className="mx-3 mb-3 rounded-lg px-3 py-2" style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-[10px] font-mono" style={{ color: "#4ADE80" }}>
              {terminalText}<span className="terminal-cursor">▊</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroDashboard;
