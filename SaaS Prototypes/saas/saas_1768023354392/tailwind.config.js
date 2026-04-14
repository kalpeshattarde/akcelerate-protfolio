module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // blue-800 - Professional blue for brand trust and navigation
        secondary: "#3B82F6", // blue-500 - Supporting blue for section headers and secondary elements
        accent: "#10B981", // emerald-500 - Conversion green exclusively for CTAs and success states
        background: "#FFFFFF", // white - Pure white for maximum content clarity
        surface: "#F8FAFC", // slate-50 - Subtle gray for section separation without visual noise
        "text-primary": "#111827", // gray-900 - High contrast black for instant readability
        "text-secondary": "#6B7280", // gray-500 - Medium gray for supporting text without distraction
        success: "#059669", // emerald-600 - Darker green for form confirmations and positive metrics
        warning: "#F59E0B", // amber-500 - Amber for scarcity elements and trial countdown timers
        error: "#DC2626", // red-600 - Clear red for form validation only
        "border-default": "#E5E7EB", // gray-200 - For form inputs only
        "border-active": "#10B981", // emerald-500 - For active form states
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      boxShadow: {
        'cta': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'testimonial': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'cta-hover': '0 10px 15px -3px rgba(16, 185, 129, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 300ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
    },
  },
  plugins: [],
}