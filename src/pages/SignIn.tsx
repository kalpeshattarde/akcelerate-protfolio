import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import SEOHead from "@/components/SEOHead";

export default function SignIn() {
  return (
    <main className="pt-20 pb-20 flex justify-center">
      <ClerkSignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/products"
      />
    </main>
  );
}
