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
        border: "var(--color-border)", // gray-700
        input: "var(--color-input)", // gray-800
        ring: "var(--color-ring)", // custom-green
        background: "var(--color-background)", // gray-950
        foreground: "var(--color-foreground)", // white
        primary: {
          DEFAULT: "var(--color-primary)", // custom-green
          foreground: "var(--color-primary-foreground)", // gray-950
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-700
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-800
          foreground: "var(--color-muted-foreground)", // gray-400
        },
        accent: {
          DEFAULT: "var(--color-accent)", // blue-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // gray-900
          foreground: "var(--color-popover-foreground)", // white
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-900
          foreground: "var(--color-card-foreground)", // white
        },
        success: {
          DEFAULT: "var(--color-success)", // custom-green
          foreground: "var(--color-success-foreground)", // gray-950
        },
        warning: {
          DEFAULT: "var(--color-warning)", // orange-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand specific colors
        surface: "var(--color-surface)", // gray-800
        'text-primary': "var(--color-text-primary)", // white
        'text-secondary': "var(--color-text-secondary)", // gray-400
        'neon-green': "var(--color-neon-green)", // custom-green
        'electric-blue': "var(--color-electric-blue)", // blue-500
        'deep-charcoal': "var(--color-deep-charcoal)", // gray-900
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'modal': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 16px rgba(0, 255, 136, 0.3)',
        'neon-blue': '0 0 16px rgba(0, 153, 255, 0.3)',
        'elevation': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'cta': '0 2px 10px rgba(0, 255, 136, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        neonPulse: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 16px rgba(0, 255, 136, 0.6))' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}