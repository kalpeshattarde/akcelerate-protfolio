/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // Electric lime
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // black
        primary: {
          DEFAULT: 'var(--color-primary)', // Deep forest green
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // Lighter forest tone
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)', // Medium gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // Electric lime
          foreground: 'var(--color-accent-foreground)', // black
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // black
        },
        card: {
          DEFAULT: 'var(--color-card)', // gray-50
          foreground: 'var(--color-card-foreground)', // black
        },
        success: {
          DEFAULT: 'var(--color-success)', // Forest-aligned green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // Warm amber
          foreground: 'var(--color-warning-foreground)', // black
        },
        error: {
          DEFAULT: 'var(--color-error)', // Clear red
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-xl': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-lg': 'clamp(1.25rem, 3vw, 2rem)',
        'fluid-md': 'clamp(1rem, 2.5vw, 1.5rem)',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)',
        'elevation-2': '0 4px 20px rgba(0,0,0,0.1), 0 8px 40px rgba(0,0,0,0.08)',
        'elevation-3': '0 8px 40px rgba(0,0,0,0.15), 0 16px 60px rgba(0,0,0,0.1)',
        'elevation-4': '0 16px 60px rgba(0,0,0,0.2), 0 24px 80px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-in': 'slideIn 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 150ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      spacing: {
        'section': 'var(--section-padding)',
      },
      borderRadius: {
        DEFAULT: '0px',
      },
      backdropBlur: {
        'soft': '8px',
      },
      transitionTimingFunction: {
        'momentum': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      zIndex: {
        'navigation': '1000',
        'dropdown': '1010',
        'drawer': '1020',
        'modal': '1030',
      },
    },
  },
  plugins: [],
}