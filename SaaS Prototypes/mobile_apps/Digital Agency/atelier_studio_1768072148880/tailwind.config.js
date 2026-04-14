/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-100 with opacity */
        input: "var(--color-input)", /* gray-100 with opacity */
        ring: "var(--color-ring)", /* amber-600 */
        background: "var(--color-background)", /* gray-950 */
        foreground: "var(--color-foreground)", /* gray-100 */
        surface: {
          DEFAULT: "var(--color-surface)", /* gray-900 */
          foreground: "var(--color-surface-foreground)", /* gray-100 */
        },
        primary: {
          DEFAULT: "var(--color-primary)", /* amber-600 */
          foreground: "var(--color-primary-foreground)", /* gray-950 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* copper */
          foreground: "var(--color-secondary-foreground)", /* gray-950 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-700 */
          foreground: "var(--color-destructive-foreground)", /* gray-100 */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-950 */
          foreground: "var(--color-muted-foreground)", /* gray-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* cyan-700 */
          foreground: "var(--color-accent-foreground)", /* gray-100 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* gray-900 */
          foreground: "var(--color-popover-foreground)", /* gray-100 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* gray-900 */
          foreground: "var(--color-card-foreground)", /* gray-100 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-600 */
          foreground: "var(--color-success-foreground)", /* gray-950 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* orange-600 */
          foreground: "var(--color-warning-foreground)", /* gray-950 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-700 */
          foreground: "var(--color-error-foreground)", /* gray-100 */
        },
      },
      fontFamily: {
        headline: ['Playfair Display', 'serif'],
        body: ['Source Serif 4', 'serif'],
        cta: ['Karla', 'sans-serif'],
        accent: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'cinematic': '0 8px 32px rgba(212, 165, 116, 0.1)',
        'dramatic': '0 20px 60px rgba(212, 165, 116, 0.3)',
        'subtle': '0 10px 40px rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        'confident': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-confident': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}