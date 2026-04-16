import { useState, useMemo } from "react";
import { FileText, Search, X, Plus, Edit3, Trash2, Eye, Calendar, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";

interface ContentItem {
  id: string;
  title: string;
  type: "blog" | "case-study" | "testimonial";
  status: "published" | "draft";
  date: string;
  excerpt: string;
}

function getContent(): ContentItem[] {
  try {
    const stored = JSON.parse(localStorage.getItem("ak-content") || "[]");
    if (stored.length > 0) return stored;
  } catch {}

  // Seed from blog data
  const items: ContentItem[] = BLOG_POSTS.map(p => ({
    id: p.slug,
    title: p.title,
    type: "blog" as const,
    status: "published" as const,
    date: p.date,
    excerpt: p.excerpt,
  }));
  return items;
}

function saveContent(items: ContentItem[]) {
  localStorage.setItem("ak-content", JSON.stringify(items));
}

export default function ContentManagementTab() {
  const [content, setContent] = useState<ContentItem[]>(getContent);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "blog" | "case-study" | "testimonial">("all");
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "blog" as ContentItem["type"], status: "draft" as ContentItem["status"], excerpt: "" });

  const filtered = useMemo(() => {
    let result = content;
    if (typeFilter !== "all") result = result.filter(c => c.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.excerpt.toLowerCase().includes(q));
    }
    return result;
  }, [content, typeFilter, search]);

  const publishedCount = content.filter(c => c.status === "published").length;
  const draftCount = content.filter(c => c.status === "draft").length;

  const handleSave = () => {
    if (!form.title.trim()) return;
    const updated = editing
      ? content.map(c => c.id === editing.id ? { ...c, ...form } : c)
      : [...content, { ...form, id: `content-${Date.now()}`, date: new Date().toISOString() }];
    setContent(updated);
    saveContent(updated);
    setShowForm(false);
    setEditing(null);
    setForm({ title: "", type: "blog", status: "draft", excerpt: "" });
  };

  const handleEdit = (item: ContentItem) => {
    setEditing(item);
    setForm({ title: item.title, type: item.type, status: item.status, excerpt: item.excerpt });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = content.filter(c => c.id !== id);
    setContent(updated);
    saveContent(updated);
  };

  const toggleStatus = (id: string) => {
    const updated = content.map(c => c.id === id ? { ...c, status: c.status === "published" ? "draft" as const : "published" as const } : c);
    setContent(updated);
    saveContent(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-poppins text-xl font-semibold text-foreground">Content Management</h2>
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: "", type: "blog", status: "draft", excerpt: "" }); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: content.length },
          { label: "Published", value: publishedCount },
          { label: "Drafts", value: draftCount },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="font-poppins text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-foreground">{editing ? "Edit Content" : "New Content"}</h3>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title"
            className="w-full px-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt / Description" rows={3}
            className="w-full px-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          <div className="flex gap-3">
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as ContentItem["type"] })}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm">
              <option value="blog">Blog Post</option>
              <option value="case-study">Case Study</option>
              <option value="testimonial">Testimonial</option>
            </select>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ContentItem["status"] })}
              className="px-3 py-2 rounded-xl border border-input bg-background text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              {editing ? "Update" : "Create"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content…"
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
        </div>
        <div className="flex gap-2">
          {(["all", "blog", "case-study", "testimonial"] as const).map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${typeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {f === "case-study" ? "Case Studies" : f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-4 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${item.type === "blog" ? "bg-primary/10 text-primary" : item.type === "case-study" ? "bg-amber-500/10 text-amber-600" : "bg-violet-500/10 text-violet-600"}`}>
                    {item.type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === "published" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.excerpt}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggleStatus(item.id)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Toggle status">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                  <Edit3 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
