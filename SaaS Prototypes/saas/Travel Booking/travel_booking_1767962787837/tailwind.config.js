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
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        'primary-900': '#1E3A8A', // Very dark blue - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate - slate-500
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Light slate - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate - slate-300
        'secondary-600': '#475569', // Medium dark slate - slate-600
        'secondary-700': '#334155', // Dark slate - slate-700

        // Accent Colors
        'accent': '#F59E0B', // Warm amber - amber-500
        'accent-100': '#FEF3C7', // Light amber - amber-100
        'accent-600': '#D97706', // Dark amber - amber-600

        // Background Colors
        'background': '#FAFBFC', // Soft off-white - custom
        'surface': '#FFFFFF', // Pure white - white

        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal - slate-800
        'text-secondary': '#64748B', // Medium slate - slate-500

        // Status Colors
        'success': '#10B981', // Vibrant emerald - emerald-500
        'success-100': '#D1FAE5', // Light emerald - emerald-100
        'success-600': '#059669', // Dark emerald - emerald-600

        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-100': '#FEF3C7', // Light amber - amber-100
        'warning-600': '#D97706', // Dark amber - amber-600

        'error': '#EF4444', // Clear red - red-500
        'error-100': '#FEE2E2', // Light red - red-100
        'error-600': '#DC2626', // Dark red - red-600

        // Border Colors
        'border': '#E2E8F0', // Light slate border - slate-200
        'border-light': '#F1F5F9', // Very light border - slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
        'data-medium': '500',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      zIndex: {
        'navigation': '1000',
        'dropdown': '1010',
        'overlay': '1020',
        'modal': '1030',
        'notification': '999',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}