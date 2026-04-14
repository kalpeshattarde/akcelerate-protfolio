module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1a365d", // navy-900
        secondary: "#2d3748", // gray-800
        accent: "#3182ce", // blue-600
        background: "#ffffff", // white
        surface: "#f7fafc", // gray-50
        'text-primary': "#1a202c", // gray-900
        'text-secondary': "#4a5568", // gray-600
        success: "#38a169", // green-500
        warning: "#ed8936", // orange-400
        error: "#e53e3e", // red-500
        'border-color': "#e2e8f0", // gray-200
        'border-focus': "#3182ce", // blue-600
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'headline': '700',
        'subheadline': '600',
        'body': '400',
        'body-medium': '500',
        'accent': '600',
        'cta': '600',
      },
      boxShadow: {
        'custom-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [],
}