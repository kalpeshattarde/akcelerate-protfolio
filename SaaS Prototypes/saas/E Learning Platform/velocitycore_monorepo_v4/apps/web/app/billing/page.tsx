export default function BillingPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Billing</h1>
      <p>Manage Stripe and Razorpay billing, invoices, checkout, and customer portal access.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button>Upgrade with Stripe</button>
        <button>Open Stripe Customer Portal</button>
        <button>Create Razorpay Order</button>
      </div>
    </main>
  );
}
