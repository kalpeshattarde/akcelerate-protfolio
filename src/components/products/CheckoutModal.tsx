import { useState } from "react";
import { CheckCircle, CreditCard, X } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface CheckoutModalProps {
  product: Product;
  currency: Currency;
  finalPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ product, currency, finalPrice, onClose, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-poppins font-semibold text-foreground">Checkout</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5">
          {step === "form" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <span className="text-sm font-medium text-foreground">{product.name}</span>
                <span className="font-bold text-primary">
                  {currency === "inr" ? "₹" : "$"}{finalPrice.toLocaleString()}
                </span>
              </div>
              <input placeholder="Email address" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" />
              <input placeholder="Card number" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM/YY" className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm" />
                <input placeholder="CVC" className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm" />
              </div>
              <button onClick={handlePay} className="w-full btn-primary justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Pay {currency === "inr" ? "₹" : "$"}{finalPrice.toLocaleString()}
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                Mock checkout — no real charges. Production will use Stripe/Razorpay.
              </p>
            </div>
          )}

          {step === "processing" && (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Processing payment...</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <h4 className="font-poppins font-semibold text-foreground">Payment Successful!</h4>
              <p className="text-sm text-muted-foreground">You now have access to {product.name}.</p>
              <button onClick={onClose} className="btn-primary mx-auto">Continue</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
