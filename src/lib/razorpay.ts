declare global {
  interface Window {
    Razorpay: any;
  }
}

let razorpayLoaded = false;

export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (razorpayLoaded && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      razorpayLoaded = true;
      resolve(true);
    };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function isRazorpayConfigured(): boolean {
  return !!import.meta.env.VITE_RAZORPAY_KEY_ID;
}

interface RazorpayCheckoutOptions {
  amount: number; // in paise (INR * 100)
  productName: string;
  customerEmail?: string;
  customerName?: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

export async function openRazorpayCheckout({
  amount,
  productName,
  customerEmail,
  customerName,
  onSuccess,
  onFailure,
}: RazorpayCheckoutOptions) {
  const loaded = await loadRazorpay();
  if (!loaded) {
    onFailure("Failed to load Razorpay SDK");
    return;
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const options = {
    key: keyId,
    amount: amount, // in paise
    currency: "INR",
    name: "AKcelerate",
    description: productName,
    image: "/images/logo-icon.svg",
    prefill: {
      name: customerName || "",
      email: customerEmail || "",
    },
    theme: {
      color: "#2563EB",
    },
    handler: (response: any) => {
      if (response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        onFailure("Payment failed");
      }
    },
    modal: {
      ondismiss: () => {
        onFailure("Payment cancelled");
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
