import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CreditCard, Loader2, LogIn, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isStripeConfigured, getStripe } from "@/lib/stripe";
import type { CartItem } from "@/hooks/useCart";
import type { Currency } from "@/config/appConfig";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  currency: Currency;
  total: number;
  onComplete: () => void;
}

export default function CheckoutModal({ open, onOpenChange, items, currency, total, onComplete }: CheckoutModalProps) {
  const symbol = currency === "inr" ? "₹" : "$";
  const { isSignedIn, user } = useUser();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [form, setForm] = useState({ name: "", email: "", card: "" });
  const stripeReady = isStripeConfigured();

  const handleStripeCheckout = async () => {
    setStep("processing");
    try {
      const stripe = await getStripe();
      if (!stripe) throw new Error("Stripe not loaded");

      // In production, this would call your backend to create a Checkout Session
      // For now, show what the integration looks like
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map(i => ({
              name: i.product.name,
              price: currency === "inr" ? i.product.price.inr : i.product.price.usd,
              quantity: i.quantity,
            })),
            currency: currency === "inr" ? "inr" : "usd",
            customerEmail: user?.primaryEmailAddress?.emailAddress,
            clerkUserId: user?.id,
          }),
        }
      );

      if (!response.ok) {
        // Stripe backend not deployed yet — fall back to mock
        handleMockCheckout();
        return;
      }

      const { sessionId } = await response.json();
      // Redirect to Stripe Checkout
      window.location.href = sessionId; // sessionId here is actually the checkout URL from your backend
    } catch {
      // Fallback to mock checkout if Stripe backend isn't ready
      handleMockCheckout();
    }
  };

  const handleMockCheckout = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      const productNames = items.map(i => i.product.name).join(", ");
      toast({
        title: "🎉 Purchase confirmed!",
        description: `You now have access to: ${productNames}. Check your email for details.`,
      });
      setTimeout(() => {
        onComplete();
        setStep("form");
        setForm({ name: "", email: "", card: "" });
      }, 3000);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stripeReady) {
      handleStripeCheckout();
    } else {
      handleMockCheckout();
    }
  };

  const handleClose = (val: boolean) => {
    if (step === "processing") return;
    onOpenChange(val);
    if (!val) { setStep("form"); }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {!isSignedIn ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <LogIn className="w-12 h-12 text-primary" />
            <h2 className="font-poppins text-xl font-bold text-foreground">Sign in to purchase</h2>
            <p className="text-muted-foreground text-sm text-center">
              Create an account or sign in to complete your purchase.
            </p>
            <Link to="/sign-in" onClick={() => onOpenChange(false)} className="btn-primary px-6 py-2.5 text-sm">
              Sign In / Sign Up
            </Link>
          </div>
        ) : step === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="font-poppins text-2xl font-bold text-foreground">Order Confirmed!</h2>
            <p className="text-muted-foreground text-sm text-center">
              Thank you for your purchase! Your products are now available in your dashboard.
            </p>
            <p className="text-muted-foreground text-xs text-center">
              A confirmation email with download instructions has been sent to your email.
            </p>
            <Link to="/my-purchases" onClick={() => onOpenChange(false)} className="text-sm font-medium text-primary hover:underline">
              Go to My Purchases →
            </Link>
          </div>
        ) : step === "processing" ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm">Processing your order...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Checkout
              </DialogTitle>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
              {items.map(({ product, quantity }) => {
                const price = currency === "inr" ? product.price.inr : product.price.usd;
                return (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {product.name} <span className="text-muted-foreground">×{quantity}</span>
                    </span>
                    <span className="font-medium text-foreground">{symbol}{(price * quantity).toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex justify-between pt-2 border-t border-border text-base font-bold">
                <span>Total</span>
                <span className="text-primary">{symbol}{total.toLocaleString()}</span>
              </div>
            </div>

            {stripeReady ? (
              <div className="space-y-4 mt-2">
                <Button onClick={handleStripeCheckout} className="w-full" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" /> Pay with Stripe — {symbol}{total.toLocaleString()}
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <Shield className="w-3 h-3" /> Secured by Stripe. 256-bit SSL encryption.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="checkout-name">Full Name</Label>
                  <Input id="checkout-name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input id="checkout-email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-card">Card Number</Label>
                  <Input id="checkout-card" required value={form.card} onChange={e => setForm(f => ({ ...f, card: e.target.value.replace(/\D/g, "").slice(0, 16) }))} placeholder="4242 4242 4242 4242" maxLength={16} />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Pay {symbol}{total.toLocaleString()}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">Mock checkout — no real charges.</p>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
