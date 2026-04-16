import { useState, useMemo } from "react";
import { Mail, Search, X, Plus, Send, Clock, CheckCircle2, AlertCircle, Bell, Trash2, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { downloadCSV } from "@/lib/csvExport";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: "purchase" | "welcome" | "notification" | "custom" | "invoice";
  createdAt: string;
}

interface NotificationLog {
  id: string;
  to: string;
  template: string;
  status: "sent" | "failed" | "queued";
  date: string;
  subject: string;
}

function getTemplates(): EmailTemplate[] {
  try {
    const stored = JSON.parse(localStorage.getItem("ak-email-templates") || "[]");
    if (stored.length > 0) return stored;
  } catch {}
  return [
    { id: "t1", name: "Purchase Confirmation", subject: "Your purchase is confirmed!", body: "Thank you for purchasing {{product}}. You can download it from your dashboard.", type: "purchase", createdAt: new Date().toISOString() },
    { id: "t2", name: "Welcome Email", subject: "Welcome to AKcelerate!", body: "Thanks for signing up! Explore our prototypes and start building.", type: "welcome", createdAt: new Date().toISOString() },
    { id: "t3", name: "Download Ready", subject: "Your download is ready", body: "Your file {{product}} is ready to download. Click the link below.", type: "notification", createdAt: new Date().toISOString() },
    { id: "t4", name: "Invoice — Standard", subject: "Invoice #{{invoiceNumber}} from AKcelerate", body: "Dear {{customerName}},\n\nPlease find below your invoice details:\n\nInvoice #: {{invoiceNumber}}\nDate: {{invoiceDate}}\nAmount: {{amount}} {{currency}}\n\nItems:\n{{itemsList}}\n\nSubtotal: {{subtotal}}\nTax (18% GST): {{tax}}\nTotal: {{total}}\n\nPayment is due within 15 days. Please use the link below to make your payment.\n\nThank you for your business!\nAKcelerate Technologies", type: "invoice", createdAt: new Date().toISOString() },
    { id: "t5", name: "Invoice — Paid Receipt", subject: "Payment received — Invoice #{{invoiceNumber}}", body: "Dear {{customerName}},\n\nWe have received your payment for Invoice #{{invoiceNumber}}.\n\nAmount Paid: {{amount}} {{currency}}\nPayment Method: {{paymentMethod}}\nTransaction ID: {{transactionId}}\nDate: {{paymentDate}}\n\nThank you for your prompt payment!\nAKcelerate Technologies", type: "invoice", createdAt: new Date().toISOString() },
    { id: "t6", name: "Invoice — Overdue Reminder", subject: "Reminder: Invoice #{{invoiceNumber}} is overdue", body: "Dear {{customerName}},\n\nThis is a friendly reminder that Invoice #{{invoiceNumber}} dated {{invoiceDate}} for {{amount}} {{currency}} is now overdue.\n\nPlease make the payment at your earliest convenience to avoid any service interruptions.\n\nIf you have already made the payment, please disregard this email.\n\nBest regards,\nAKcelerate Technologies", type: "invoice", createdAt: new Date().toISOString() },
  ];
}

function getLogs(): NotificationLog[] {
  try { return JSON.parse(localStorage.getItem("ak-email-logs") || "[]"); } catch { return []; }
}

function saveTemplates(t: EmailTemplate[]) { localStorage.setItem("ak-email-templates", JSON.stringify(t)); }
function saveLogs(l: NotificationLog[]) { localStorage.setItem("ak-email-logs", JSON.stringify(l)); }

export default function EmailNotificationsTab() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(getTemplates);
  const [logs, setLogs] = useState<NotificationLog[]>(getLogs);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"templates" | "logs" | "preview">("templates");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<EmailTemplate | null>(null);
  const [form, setForm] = useState({ name: "", subject: "", body: "", type: "custom" as EmailTemplate["type"] });
  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return templates;
    const q = search.toLowerCase();
    return templates.filter(t => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
  }, [templates, search]);

  const filteredLogs = useMemo(() => {
    if (!search.trim()) return logs;
    const q = search.toLowerCase();
    return logs.filter(l => l.to.toLowerCase().includes(q) || l.template.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q));
  }, [logs, search]);

  const sentCount = logs.filter(l => l.status === "sent").length;
  const failedCount = logs.filter(l => l.status === "failed").length;

  const handleSaveTemplate = () => {
    if (!form.name.trim() || !form.subject.trim()) return;
    const updated = editing
      ? templates.map(t => t.id === editing.id ? { ...t, ...form } : t)
      : [...templates, { ...form, id: `tmpl-${Date.now()}`, createdAt: new Date().toISOString() }];
    setTemplates(updated);
    saveTemplates(updated);
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", subject: "", body: "", type: "custom" });
  };

  const handleDeleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    saveTemplates(updated);
  };

  const handleSendTest = (template: EmailTemplate) => {
    if (!testEmail.trim()) {
      toast({ title: "Enter an email", description: "Please enter a test email address." });
      return;
    }
    setSendingTest(template.id);
    setTimeout(() => {
      const log: NotificationLog = {
        id: `log-${Date.now()}`,
        to: testEmail,
        template: template.name,
        status: "sent",
        date: new Date().toISOString(),
        subject: template.subject,
      };
      const updated = [log, ...logs];
      setLogs(updated);
      saveLogs(updated);
      setSendingTest(null);
      toast({ title: "Test email sent!", description: `"${template.subject}" sent to ${testEmail}` });
    }, 1000);
  };

  const exportLogs = () => {
    downloadCSV("email-logs.csv",
      ["To", "Template", "Subject", "Status", "Date"],
      logs.map(l => [l.to, l.template, l.subject, l.status, new Date(l.date).toLocaleString()])
    );
  };

  // Sample data for invoice preview
  const sampleInvoiceData: Record<string, string> = {
    "{{invoiceNumber}}": "INV-2026-0042",
    "{{invoiceDate}}": "April 16, 2026",
    "{{customerName}}": "Rahul Sharma",
    "{{amount}}": "₹24,999",
    "{{currency}}": "INR",
    "{{subtotal}}": "₹21,185",
    "{{tax}}": "₹3,814",
    "{{total}}": "₹24,999",
    "{{itemsList}}": "• SaaS CRM Prototype — ₹14,999\n• Mobile App Template — ₹9,999",
    "{{product}}": "SaaS CRM Prototype",
    "{{paymentMethod}}": "UPI",
    "{{transactionId}}": "TXN-8374629105",
    "{{paymentDate}}": "April 16, 2026",
  };

  const renderPreview = (body: string) => {
    let rendered = body;
    for (const [key, val] of Object.entries(sampleInvoiceData)) {
      rendered = rendered.split(key).join(val);
    }
    return rendered;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="font-poppins text-xl font-semibold text-foreground">Email & Notifications</h2>
        </div>
        <div className="flex gap-2">
          {view === "logs" && (
            <button onClick={exportLogs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          )}
          {view === "templates" && (
            <button onClick={() => { setEditing(null); setForm({ name: "", subject: "", body: "", type: "custom" }); setShowForm(true); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> New Template
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "Templates", value: templates.length, icon: Mail },
          { label: "Invoice Templates", value: templates.filter(t => t.type === "invoice").length, icon: FileText },
          { label: "Emails Sent", value: sentCount, icon: Send },
          { label: "Failed", value: failedCount, icon: AlertCircle },
          { label: "Total Logs", value: logs.length, icon: Bell },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
            <p className="font-poppins text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {(["templates", "logs", "preview"] as const).map(v => (
            <button key={v} onClick={() => { setView(v); setSearch(""); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {v === "templates" ? "Templates" : v === "logs" ? "Send Logs" : "Invoice Preview"}
            </button>
          ))}
        </div>
        {view !== "preview" && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${view}…`}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
          </div>
        )}
      </div>

      {/* Template Form */}
      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground">{editing ? "Edit Template" : "New Template"}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Template name"
              className="px-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as EmailTemplate["type"] })}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm">
              <option value="purchase">Purchase</option>
              <option value="welcome">Welcome</option>
              <option value="notification">Notification</option>
              <option value="invoice">Invoice</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Email subject"
            className="w-full px-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} placeholder="Email body (use {{variable}} for placeholders)" rows={6}
            className="w-full px-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono" />
          <div className="flex gap-2">
            <button onClick={handleSaveTemplate} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">{editing ? "Update" : "Create"}</button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80">Cancel</button>
          </div>
        </div>
      )}

      {/* Templates View */}
      {view === "templates" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="Test email address"
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground" />
          </div>

          {filteredTemplates.map(tmpl => (
            <div key={tmpl.id} className="rounded-2xl border border-border bg-card p-4 hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{tmpl.name}</h4>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      tmpl.type === "purchase" ? "bg-emerald-500/10 text-emerald-600" :
                      tmpl.type === "welcome" ? "bg-primary/10 text-primary" :
                      tmpl.type === "invoice" ? "bg-violet-500/10 text-violet-600" :
                      tmpl.type === "notification" ? "bg-amber-500/10 text-amber-600" :
                      "bg-muted text-muted-foreground"
                    }`}>{tmpl.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Subject: {tmpl.subject}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{tmpl.body}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => { setPreviewTemplate(tmpl); setView("preview"); }}
                    className="p-2 rounded-lg hover:bg-muted transition-colors" title="Preview">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleSendTest(tmpl)} disabled={sendingTest === tmpl.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                    {sendingTest === tmpl.id ? <Clock className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Test
                  </button>
                  <button onClick={() => { setEditing(tmpl); setForm({ name: tmpl.name, subject: tmpl.subject, body: tmpl.body, type: tmpl.type }); setShowForm(true); }}
                    className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDeleteTemplate(tmpl.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Preview */}
      {view === "preview" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {templates.filter(t => t.type === "invoice").map(t => (
              <button key={t.id} onClick={() => setPreviewTemplate(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${previewTemplate?.id === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {t.name}
              </button>
            ))}
            {templates.filter(t => t.type !== "invoice").length > 0 && (
              <span className="text-xs text-muted-foreground self-center ml-2">or select any template:</span>
            )}
            {templates.filter(t => t.type !== "invoice").map(t => (
              <button key={t.id} onClick={() => setPreviewTemplate(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${previewTemplate?.id === t.id ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted/80"}`}>
                {t.name}
              </button>
            ))}
          </div>

          {previewTemplate ? (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="bg-primary/5 border-b border-border px-6 py-4">
                <p className="text-xs text-muted-foreground mb-1">Subject</p>
                <p className="font-semibold text-foreground">{renderPreview(previewTemplate.subject)}</p>
              </div>
              <div className="p-6">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                  {renderPreview(previewTemplate.body)}
                </pre>
              </div>
              <div className="border-t border-border px-6 py-3 bg-muted/30 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Template: {previewTemplate.name} • Type: {previewTemplate.type}</p>
                <button onClick={() => handleSendTest(previewTemplate)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-3.5 h-3.5" /> Send Test
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-border bg-muted/20">
              <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Select a template above to preview it with sample data.</p>
            </div>
          )}
        </div>
      )}

      {/* Logs View */}
      {view === "logs" && (
        filteredLogs.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-border bg-muted/20">
            <Bell className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No email logs yet. Send a test email to see logs here.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">To</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Template</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-foreground">{log.to}</td>
                      <td className="px-4 py-3 text-muted-foreground">{log.template}</td>
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">{log.subject}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                          log.status === "sent" ? "bg-emerald-500/10 text-emerald-600" :
                          log.status === "failed" ? "bg-red-500/10 text-red-600" :
                          "bg-amber-500/10 text-amber-600"
                        }`}>
                          {log.status === "sent" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-muted-foreground">
                        {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}
