import React from 'react';

const PaymentMethods = () => {
  const paymentLogos = [
    { name: 'Visa', color: '#1A1F71' },
    { name: 'Mastercard', color: '#EB001B' },
    { name: 'Amex', color: '#006FCF' },
    { name: 'PayPal', color: '#003087' },
    { name: 'Stripe', color: '#635BFF' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="text-center mb-6">
        <h3 className="font-headline text-lg font-semibold text-foreground mb-2">
          Secure Payment Methods
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          All transactions are encrypted and secure
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {paymentLogos?.map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-20 h-12 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
          >
            <span
              className="font-cta font-bold text-xs"
              style={{ color: payment?.color }}
            >
              {payment?.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <svg
          className="w-4 h-4 text-success"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default PaymentMethods;