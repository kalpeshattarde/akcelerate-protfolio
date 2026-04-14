export default function SocialPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Social Publishing</h1>
      <p>Connect accounts, draft posts, schedule content, and publish approved posts.</p>
      <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
        <button>Connect LinkedIn</button>
        <button>Connect Facebook</button>
        <textarea placeholder="Draft a post..." rows={6} />
        <button>Create Draft</button>
      </div>
    </main>
  );
}
