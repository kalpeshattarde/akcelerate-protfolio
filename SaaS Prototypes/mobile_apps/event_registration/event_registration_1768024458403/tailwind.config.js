module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // blue-800 - Navy authority
        secondary: "#3b82f6", // blue-500 - Professional blue
        accent: "#f97316", // orange-500 - Conversion orange
        background: "#ffffff", // white - Clean canvas
        surface: "#f8fafc", // slate-50 - Subtle section separation
        "text-primary": "#1f2937", // gray-800 - High contrast
        "text-secondary": "#6b7280", // gray-500 - Supporting details
        success: "#10b981", // emerald-500 - Positive reinforcement
        warning: "#f59e0b", // amber-500 - Scarcity messaging
        error: "#ef4444", // red-500 - Form validation
        border: "#e5e7eb", // gray-200 - Form inputs
        "border-accent": "#f97316", // orange-500 - Early bird highlight
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        'inter-normal': '400',
        'inter-medium': '500',
        'inter-semibold': '600',
        'inter-bold': '700',
        'inter-extrabold': '800',
        'playfair-medium': '500',
        'playfair-semibold': '600',
      },
      boxShadow: {
        'cta': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'cta-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-in-out',
      },
    },
  },
  plugins: [],
}