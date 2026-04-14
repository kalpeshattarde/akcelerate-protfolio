module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./*.html"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#2ECC71", // emerald-500
        "primary-dark": "#27AE60", // emerald-600
        "primary-light": "#58D68D", // emerald-400
        
        // Secondary Colors
        secondary: "#2C3E50", // slate-800
        "secondary-light": "#34495E", // slate-700
        "secondary-dark": "#1B2631", // slate-900
        
        // Accent Colors
        accent: "#27AE60", // emerald-600
        "accent-light": "#2ECC71", // emerald-500
        
        // Background Colors
        background: "#FFFFFF", // white
        surface: "#F8F9FA", // gray-50
        "surface-dark": "#E9ECEF", // gray-100
        
        // Text Colors
        "text-primary": "#2C3E50", // slate-800
        "text-secondary": "#7F8C8D", // gray-500
        "text-light": "#BDC3C7", // gray-400
        
        // Status Colors
        success: "#2ECC71", // emerald-500
        warning: "#F39C12", // orange-500
        error: "#E74C3C", // red-500
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': '800',
      },
      boxShadow: {
        'cta': '0 4px 12px rgba(46, 204, 113, 0.15)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'hover': '0 6px 20px rgba(46, 204, 113, 0.25)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}