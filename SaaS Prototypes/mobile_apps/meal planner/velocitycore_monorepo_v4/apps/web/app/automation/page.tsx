export default function AutomationPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Automation Maker</h1>
      <p>Create n8n or Zapier-style automations using triggers, conditions, and actions.</p>
      <div style={{ display: "grid", gap: 12, maxWidth: 700 }}>
        <input placeholder="Automation name" />
        <input placeholder="Trigger key, e.g. payment.failed" />
        <select>
          <option>n8n</option>
          <option>zapier</option>
        </select>
        <textarea rows={8} placeholder='Describe steps or JSON builder config' />
        <button>Create Automation</button>
      </div>
    </main>
  );
}
