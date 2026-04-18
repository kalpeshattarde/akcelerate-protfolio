import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import SEOHead from "@/components/SEOHead";

export default function SignUp() {
  return (
    <main className="pt-28 pb-20 flex justify-center">
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/products"
      />
    </main>
  );
}
