import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import { solutions } from "@/data/solutions";

// Routes registered in src/App.tsx for the Solutions section.
// Keep this list in sync if App.tsx route definitions change.
const REGISTERED_SOLUTION_ROUTES = new Set<string>([
  "/solutions",
  ...solutions.map((s) => `/solutions/${s.slug}`),
]);

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <ClerkProvider publishableKey="pk_test_dummy" afterSignOutUrl="/">
        <MemoryRouter initialEntries={[path]}>
          <Navbar />
        </MemoryRouter>
      </ClerkProvider>
    </HelmetProvider>,
  );
}

describe("Navbar — Solutions mega menu", () => {
  it("every dropdown link points at a route registered in App.tsx", () => {
    renderAt("/");

    // Hover the Solutions trigger to open the dropdown
    const trigger = screen.getByRole("link", { name: /^Solutions/i });
    fireEvent.mouseEnter(trigger.parentElement as HTMLElement);

    // All anchor hrefs that target /solutions or /solutions/<slug>
    const allLinks = screen.getAllByRole("link") as HTMLAnchorElement[];
    const solutionsLinks = allLinks
      .map((a) => new URL(a.href, "http://localhost").pathname)
      .filter((p) => p === "/solutions" || p.startsWith("/solutions/"));

    expect(solutionsLinks.length).toBeGreaterThan(0);

    for (const path of solutionsLinks) {
      expect(
        REGISTERED_SOLUTION_ROUTES.has(path),
        `Dropdown link ${path} is not a registered route`,
      ).toBe(true);
    }

    // Sanity: every solution slug appears in the dropdown.
    for (const s of solutions) {
      expect(solutionsLinks).toContain(`/solutions/${s.slug}`);
    }
  });

  it("highlights the Solutions trigger as active on a detail page", () => {
    const slug = solutions[0].slug;
    renderAt(`/solutions/${slug}`);

    const trigger = screen.getByRole("link", { name: /^Solutions/i });
    // Active state is signalled via the `text-primary` token + font-semibold
    expect(trigger.className).toMatch(/text-primary/);
    expect(trigger.className).toMatch(/font-semibold/);
  });

  it("does not highlight Solutions on unrelated routes", () => {
    renderAt("/about");
    const trigger = screen.getByRole("link", { name: /^Solutions/i });
    expect(trigger.className).toMatch(/text-muted-foreground/);
  });

  it("never renders a 'Services' label or /services link", () => {
    renderAt("/");
    expect(screen.queryByText(/^Services$/i)).toBeNull();
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const servicesLinks = links.filter((a) =>
      new URL(a.href, "http://localhost").pathname.startsWith("/services"),
    );
    expect(servicesLinks).toHaveLength(0);
  });
});
