/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Darker blue (900-level shade) - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate gray (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Light slate (300-level shade) - slate-300
        'secondary-600': '#475569', // Medium slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Dark slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Darker slate (800-level shade) - slate-800
        'secondary-900': '#0F172A', // Darkest slate (900-level shade) - slate-900

        // Accent Colors
        'accent': '#059669', // Emerald green (accent) - emerald-600
        'accent-50': '#ECFDF5', // Light emerald (50-level shade) - emerald-50
        'accent-100': '#D1FAE5', // Light emerald (100-level shade) - emerald-100
        'accent-500': '#10B981', // Medium emerald (500-level shade) - emerald-500
        'accent-700': '#047857', // Dark emerald (700-level shade) - emerald-700

        // Background Colors
        'background': '#F8FAFC', // Soft off-white background - slate-50
        'surface': '#FFFFFF', // Pure white surface - white

        // Text Colors
        'text-primary': '#0F172A', // Near-black primary text - slate-900
        'text-secondary': '#475569', // Medium gray secondary text - slate-600

        // Status Colors
        'success': '#10B981', // Vibrant green success - emerald-500
        'success-50': '#ECFDF5', // Light success (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light success (100-level shade) - emerald-100

        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-50': '#FFFBEB', // Light warning (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light warning (100-level shade) - amber-100

        'error': '#EF4444', // Clear red error - red-500
        'error-50': '#FEF2F2', // Light error (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light error (100-level shade) - red-100

        // Border Colors
        'border': '#E2E8F0', // Minimal border color - slate-200
        'border-light': '#F1F5F9', // Light border color - slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      borderRadius: {
        'card': '6px',
        'button': '4px',
      },
      boxShadow: {
        'elevation-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        'elevation-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 200ms cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      zIndex: {
        'navigation': '100',
        'dropdown': '200',
        'modal': '300',
        'toast': '400',
      },
    },
  },
  plugins: [],
}