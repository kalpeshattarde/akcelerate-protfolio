import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const KNOWLEDGE = [
  { q: ["service", "what do you do", "offer", "help"], a: "AKcelerate offers AI/ML solutions, data analytics, business automation, cloud/DevOps, SaaS development, and digital transformation consulting for enterprises." },
  { q: ["pricing", "cost", "price", "plan"], a: "We offer three tiers: Starter ($29/mo), Professional ($119/mo), and Enterprise ($499/mo). Visit our /pricing page for full details!" },
  { q: ["contact", "reach", "email", "call"], a: "You can reach us at our /contact page or email hello@akcelerate.com. We also offer a free audit at /free-audit!" },
  { q: ["industry", "sector", "who do you work"], a: "We serve 13+ industries including manufacturing, healthcare, fintech, retail, logistics, energy, and more." },
  { q: ["case stud", "project", "portfolio", "work"], a: "Check out our /case-studies and /completed-projects pages to see our track record and client success stories." },
  { q: ["founder", "team", "about"], a: "Learn about our founder and mission at /founder and /about pages." },
  { q: ["product", "marketplace", "template", "saas"], a: "We sell production-ready SaaS prototypes and digital products at /products — from CRM to fitness apps!" },
  { q: ["audit", "free", "consultation"], a: "We offer a free digital audit! Visit /free-audit to get started with a no-obligation assessment of your business." },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of KNOWLEDGE) {
    if (entry.q.some(k => lower.includes(k))) return entry.a;
  }
  return "Thanks for your question! For detailed assistance, please visit our /contact page or try our /free-audit. I can help with questions about our services, pricing, industries, and products.";
}

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm AK, your virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold text-sm">AKcelerate Assistant</span>
            <span className="ml-auto text-xs opacity-75">Online</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && <Bot className="w-5 h-5 text-primary mt-1 shrink-0" />}
                <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
                {m.role === "user" && <User className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button onClick={send} className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
