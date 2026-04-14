export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <form style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: 16, display: "grid", gap: 8, maxWidth: 320 }}>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
        <button>Continue with LinkedIn</button>
      </div>
    </main>
  );
}
