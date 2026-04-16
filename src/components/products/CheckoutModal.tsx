import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CreditCard, Loader2, LogIn, Shield, IndianRupee, Tag, X, Sparkles, Crown, BadgePercent } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BUNDLE_THRESHOLD, STARTER_PRICE } from "@/hooks/useCart";
import { PRODUCTS } from "@/data/products";
import { isStripeConfigured } from "@/lib/stripe";
import { isRazorpayConfigured, openRazorpayCheckout } from "@/lib/razorpay";
import { useDiscountCode } from "@/hooks/useDiscountCode";
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
  const [couponInput, setCouponInput] = useState("");
  const { appliedDiscount, applyCode, removeDiscount, calculateDiscountedTotal } = useDiscountCode(currency);

  const stripeReady = isStripeConfigured();
  const razorpayReady = isRazorpayConfigured();
  const useRazorpay = currency === "inr" && razorpayReady;
  const useStripe = currency !== "inr" && stripeReady;
  const hasRealPayment = useRazorpay || useStripe;

  const finalTotal = calculateDiscountedTotal(total);
  const orderId = `AK-${Date.now().toString(36).toUpperCase()}`;

  const showSuccess = () => {
    setStep("success");
    // Save order to localStorage for history
    const orders = JSON.parse(localStorage.getItem("ak-orders") || "[]");
    orders.unshift({
      orderId,
      date: new Date().toISOString(),
      items: items.map(i => ({ name: i.product.name, id: i.product.id, quantity: i.quantity })),
      subtotal: total,
      discount: appliedDiscount?.valid ? { code: appliedDiscount.code, percent: appliedDiscount.percent } : null,
      total: finalTotal,
      currency,
      status: "completed",
      paymentMethod: useRazorpay ? "razorpay" : useStripe ? "stripe" : "mock",
    });
    localStorage.setItem("ak-orders", JSON.stringify(orders));

    const productNames = items.map(i => i.product.name).join(", ");
    toast({
      title: "🎉 Purchase confirmed!",
      description: `Order ${orderId}: ${productNames}. Check your email for details.`,
    });
    setTimeout(() => {
      onComplete();
      setStep("form");
      setForm({ name: "", email: "", card: "" });
      setCouponInput("");
      removeDiscount();
    }, 3000);
  };

  const handleCouponApply = () => {
    const result = applyCode(couponInput);
    toast({
      title: result.valid ? "✅ Coupon applied" : "❌ Invalid coupon",
      description: result.message,
      variant: result.valid ? "default" : "destructive",
    });
  };

  const handleRazorpayCheckout = () => {
    setStep("processing");
    openRazorpayCheckout({
      amount: Math.round(finalTotal * 100),
      productName: items.map(i => i.product.name).join(", "),
      customerEmail: user?.primaryEmailAddress?.emailAddress,
      customerName: user?.fullName || "",
      onSuccess: () => showSuccess(),
      onFailure: (error) => {
        setStep("form");
        if (error !== "Payment cancelled") {
          toast({ title: "Payment failed", description: error, variant: "destructive" });
        }
      },
    });
  };

  const handleStripeCheckout = async () => {
    setStep("processing");
    try {
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
            discountCode: appliedDiscount?.valid ? appliedDiscount.code : undefined,
          }),
        }
      );

      if (!response.ok) {
        handleMockCheckout();
        return;
      }

      const { sessionId } = await response.json();
      window.location.href = sessionId;
    } catch {
      handleMockCheckout();
    }
  };

  const handleMockCheckout = () => {
    setStep("processing");
    setTimeout(() => showSuccess(), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMockCheckout();
  };

  const handlePaymentClick = () => {
    if (useRazorpay) handleRazorpayCheckout();
    else if (useStripe) handleStripeCheckout();
    else handleMockCheckout();
  };

  const handleClose = (val: boolean) => {
    if (step === "processing") return;
    onOpenChange(val);
    if (!val) { setStep("form"); }
  };

  const discountAmount = appliedDiscount?.valid ? total - finalTotal : 0;

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
            <p className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">{orderId}</p>
            <p className="text-muted-foreground text-sm text-center">
              Thank you for your purchase! Your products are now available in your dashboard.
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

            {/* Order Summary with Savings */}
            {(() => {
              const starterPerItem = currency === "inr" ? STARTER_PRICE.inr : STARTER_PRICE.usd;
              const individualTotal = starterPerItem * items.length;
              const isAllAccess = items.length >= PRODUCTS.length * 0.8;
              const isBundleTier = items.length >= BUNDLE_THRESHOLD && !isAllAccess;
              const tierName = isAllAccess ? "All Access" : isBundleTier ? "Pro Bundle" : "Starter";
              const savings = individualTotal - total;
              const savingsPercent = individualTotal > 0 ? Math.round((savings / individualTotal) * 100) : 0;

              return (
                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                  {/* Tier badge */}
                  {(isAllAccess || isBundleTier) && (
                    <div className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                      isAllAccess ? "bg-amber-500/10 border border-amber-500/20" : "bg-primary/10 border border-primary/20"
                    }`}>
                      {isAllAccess ? <Crown className="w-4 h-4 text-amber-500" /> : <Sparkles className="w-4 h-4 text-primary" />}
                      <span className="text-foreground font-semibold">{tierName}</span>
                      <span className="text-muted-foreground">— {items.length} prototypes</span>
                    </div>
                  )}

                  {/* Items (collapsed if many) */}
                  <div className={`space-y-1.5 ${items.length > 6 ? "max-h-36 overflow-y-auto pr-1" : ""}`}>
                    {items.map(({ product }) => (
                      <div key={product.id} className="flex justify-between text-sm">
                        <span className="text-foreground truncate mr-2">{product.name}</span>
                        <span className="font-medium text-muted-foreground whitespace-nowrap">
                          {(isAllAccess || isBundleTier) ? "Included" : `${symbol}${starterPerItem.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Savings breakdown */}
                  {savings > 0 && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                        <BadgePercent className="w-4 h-4" />
                        You save {symbol}{savings.toLocaleString()} ({savingsPercent}% off)
                      </div>
                      <div className="flex justify-between text-xs text-green-700/70">
                        <span>If bought individually ({items.length} × {symbol}{starterPerItem.toLocaleString()})</span>
                        <span className="line-through">{symbol}{individualTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-green-700/70">
                        <span>{tierName} price</span>
                        <span className="font-medium">{symbol}{total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Coupon discount */}
                  {appliedDiscount?.valid && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {appliedDiscount.code} (-{appliedDiscount.percent}%)
                      </span>
                      <span>-{symbol}{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between pt-2 border-t border-border text-base font-bold">
                    <span>Total</span>
                    <span className="text-primary">{symbol}{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}

            {/* Coupon Code */}
            <div className="flex gap-2">
              {appliedDiscount?.valid ? (
                <div className="flex-1 flex items-center justify-between bg-green-500/10 text-green-700 rounded-lg px-3 py-2 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> {appliedDiscount.code} — {appliedDiscount.percent}% off
                  </span>
                  <button onClick={removeDiscount} className="hover:text-green-900"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <>
                  <Input
                    placeholder="Discount code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1"
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleCouponApply())}
                  />
                  <Button variant="outline" size="sm" onClick={handleCouponApply} disabled={!couponInput.trim()}>
                    Apply
                  </Button>
                </>
              )}
            </div>

            {hasRealPayment ? (
              <div className="space-y-4 mt-2">
                <Button onClick={handlePaymentClick} className="w-full" size="lg">
                  {useRazorpay ? (
                    <><IndianRupee className="w-4 h-4 mr-2" /> Pay with Razorpay — {symbol}{finalTotal.toLocaleString()}</>
                  ) : (
                    <><CreditCard className="w-4 h-4 mr-2" /> Pay with Stripe — {symbol}{finalTotal.toLocaleString()}</>
                  )}
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  {useRazorpay ? "Secured by Razorpay. PCI DSS compliant." : "Secured by Stripe. 256-bit SSL encryption."}
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
                  Pay {symbol}{finalTotal.toLocaleString()}
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
