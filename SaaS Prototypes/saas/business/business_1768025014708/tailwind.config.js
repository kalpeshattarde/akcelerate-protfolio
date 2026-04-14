module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d", // blue-900
          50: "#e6f3ff", // blue-50
          100: "#b3d9ff", // blue-100
          200: "#80bfff", // blue-200
          300: "#4da6ff", // blue-300
          400: "#1a8cff", // blue-400
          500: "#1a365d", // blue-900
          600: "#153056", // blue-950
          700: "#102a4f", // custom-blue
          800: "#0b2448", // custom-blue
          900: "#061e41", // custom-blue
        },
        secondary: {
          DEFAULT: "#2d3748", // gray-700
          50: "#f7fafc", // gray-50
          100: "#edf2f7", // gray-100
          200: "#e2e8f0", // gray-200
          300: "#cbd5e0", // gray-300
          400: "#a0aec0", // gray-400
          500: "#718096", // gray-500
          600: "#4a5568", // gray-600
          700: "#2d3748", // gray-700
          800: "#1a202c", // gray-800
          900: "#171923", // gray-900
        },
        accent: {
          DEFAULT: "#38a169", // green-600
          50: "#f0fff4", // green-50
          100: "#c6f6d5", // green-100
          200: "#9ae6b4", // green-200
          300: "#68d391", // green-300
          400: "#48bb78", // green-400
          500: "#38a169", // green-600
          600: "#2f855a", // green-700
          700: "#276749", // green-800
          800: "#22543d", // green-900
          900: "#1c4532", // green-950
        },
        background: "#ffffff", // white
        surface: "#f7fafc", // gray-50
        text: {
          primary: "#1a202c", // gray-800
          secondary: "#4a5568", // gray-600
        },
        success: "#68d391", // green-300
        warning: "#ed8936", // orange-400
        error: "#e53e3e", // red-500
        border: {
          DEFAULT: "#e2e8f0", // gray-200
          light: "#f7fafc", // gray-50
        },
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
      },
      boxShadow: {
        minimal: '0 1px 3px rgba(0, 0, 0, 0.1)',
        strong: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}