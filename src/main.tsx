import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";
import { bootBrandKit } from "./lib/brandKit";
import { initTestMode } from "./lib/testMode";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

bootBrandKit();
initTestMode();

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_KEY}>
    <App />
  </ClerkProvider>
);
