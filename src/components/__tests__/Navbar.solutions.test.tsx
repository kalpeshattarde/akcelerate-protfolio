import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { solutions } from "@/data/solutions";

// Mock Clerk — Navbar uses <SignedIn>/<SignedOut>/<UserButton>/useUser only
// for the auth area, which is not under test here.
vi.mock("@clerk/clerk-react", () => ({
  SignedIn: () => null,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => null,
  useUser: () => ({ user: null }),
}));

// Mock SearchModal (it imports heavy data and isn't part of this test).
vi.mock("@/components/SearchModal", () => ({
  default: () => null,
}));

import Navbar from "@/components/Navbar";

// Routes registered in src/App.tsx for the Solutions section.
const REGISTERED_SOLUTION_ROUTES = new Set<string>([
  "/solutions",
  ...solutions.map((s) => `/solutions/${s.slug}`),
]);

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Navbar />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Navbar — Solutions mega menu", () => {
  it("every dropdown link points at a route registered in App.tsx", () => {
    renderAt("/");

    // Open the dropdown by hovering its container
    const trigger = screen.getAllByRole("link", { name: /^Solutions/i })[0];
    fireEvent.mouseEnter(trigger.parentElement as HTMLElement);

    const allLinks = screen.getAllByRole("link") as HTMLAnchorElement[];
    const solutionsLinks = Array.from(
      new Set(
        allLinks
          .map((a) => new URL(a.href, "http://localhost").pathname)
          .filter((p) => p === "/solutions" || p.startsWith("/solutions/")),
      ),
    );

    expect(solutionsLinks.length).toBeGreaterThan(0);
    for (const path of solutionsLinks) {
      expect(
        REGISTERED_SOLUTION_ROUTES.has(path),
        `Dropdown link ${path} is not a registered route in App.tsx`,
      ).toBe(true);
    }
    for (const s of solutions) {
      expect(solutionsLinks).toContain(`/solutions/${s.slug}`);
    }
  });

  it("highlights the Solutions trigger as active on a detail page", () => {
    const slug = solutions[0].slug;
    renderAt(`/solutions/${slug}`);
    const trigger = screen.getAllByRole("link", { name: /^Solutions/i })[0];
    expect(trigger.className).toMatch(/text-primary/);
    expect(trigger.className).toMatch(/font-semibold/);
  });

  it("does not highlight Solutions on unrelated routes", () => {
    renderAt("/about");
    const trigger = screen.getAllByRole("link", { name: /^Solutions/i })[0];
    expect(trigger.className).toMatch(/text-muted-foreground/);
  });

  it("never renders a 'Services' label or legacy nav link", () => {
    renderAt("/");
    expect(screen.queryByText(/^Services$/i)).toBeNull();
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const legacyLinks = links.filter((a) => {
      const p = new URL(a.href, "http://localhost").pathname;
      return p === "/services" || p.startsWith("/services/");
    });
    expect(legacyLinks).toHaveLength(0);
  });
});
