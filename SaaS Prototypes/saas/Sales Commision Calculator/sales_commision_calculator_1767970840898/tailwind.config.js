/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Foundation Colors
        'dark': {
          'primary': '#0F111A',
          'secondary': '#1E1E28', 
          'surface': '#232331',
          'elevated': '#2A2A3A',
        },
        
        // Glassmorphism Colors
        'glass': {
          'white': 'rgba(255, 255, 255, 0.04)',
          'white-hover': 'rgba(255, 255, 255, 0.08)',
          'white-active': 'rgba(255, 255, 255, 0.12)',
          'border': 'rgba(255, 255, 255, 0.1)',
        },
        
        // Neon Accent Colors  
        'neon': {
          'indigo': '#6366F1',
          'aqua': '#06B6D4', 
          'teal': '#10B981',
          'purple': '#8B5CF6',
        },
        
        // Primary Colors - Modern Purple-Blue Gradient Theme
        'primary': '#6366F1', // Indigo-500 - Professional indigo (primary)
        'primary-50': '#EEF2FF', // Indigo-50 - Very light indigo
        'primary-100': '#E0E7FF', // Indigo-100 - Light indigo
        'primary-500': '#6366F1', // Indigo-500 - Medium indigo
        'primary-600': '#5B21B6', // Violet-800 - Rich violet accent
        'primary-700': '#4C1D95', // Violet-900 - Dark violet
        'primary-900': '#312E81', // Indigo-900 - Very dark indigo
        
        // Secondary Colors - Sophisticated Cool Gray
        'secondary': '#64748B', // Sophisticated slate (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Very light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Light-medium slate (300-level shade) - slate-300
        'secondary-400': '#94A3B8', // Medium slate (400-level shade) - slate-400
        'secondary-600': '#475569', // Dark slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Darker slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Very dark slate (800-level shade) - slate-800
        'secondary-900': '#0F172A', // Darkest slate (900-level shade) - slate-900
        
        // Accent Colors - Modern Teal for System Integration
        'accent': '#0891B2', // Cyan-600 - Professional teal (accent)
        'accent-50': '#ECFEFF', // Cyan-50 - Very light teal
        'accent-100': '#CFFAFE', // Cyan-100 - Light teal
        'accent-500': '#06B6D4', // Cyan-500 - Medium teal
        'accent-700': '#0E7490', // Cyan-700 - Dark teal
        
        // Integration-specific Theme Colors
        'integration': {
          'primary': '#8B5CF6', // Violet-500 - Integration primary
          'secondary': '#06B6D4', // Cyan-500 - Integration secondary
          'surface': '#FAFBFC', // Custom light background
          'border': '#E5E7EB', // Gray-200 - Subtle borders
          'highlight': '#F3F4F6', // Gray-100 - Highlight areas
        },
        
        // Background Colors
        'background': '#F8FAFC', // Clean near-white background - slate-50
        'surface': '#FFFFFF', // Pure white surface - white
        
        // Text Colors
        'text-primary': '#0F172A', // High-contrast dark text - slate-900
        'text-secondary': '#475569', // Medium gray text - slate-600
        
        // Dark Theme Text Colors
        'text-primary-dark': '#FFFFFF',
        'text-secondary-dark': '#D1D5DB', 
        'text-muted-dark': '#9CA3AF',
        
        // Status Colors - Enhanced for System Monitoring
        'success': '#10B981', // Vibrant green for success - emerald-500
        'success-50': '#ECFDF5', // Light success background - emerald-50
        'success-100': '#D1FAE5', // Light success background - emerald-100
        'success-600': '#059669', // Dark success - emerald-600
        
        'warning': '#F59E0B', // Attention-grabbing amber - amber-500
        'warning-50': '#FFFBEB', // Light warning background - amber-50
        'warning-100': '#FEF3C7', // Light warning background - amber-100
        'warning-600': '#D97706', // Dark warning - amber-600
        
        'error': '#EF4444', // Clear red for errors - red-500
        'error-50': '#FEF2F2', // Light error background - red-50
        'error-100': '#FEE2E2', // Light error background - red-100
        'error-600': '#DC2626', // Dark error - red-600
        
        'info': '#3B82F6', // Information blue - blue-500
        'info-50': '#EFF6FF', // Light info background - blue-50
        'info-100': '#DBEAFE', // Light info background - blue-100
        'info-600': '#2563EB', // Dark info - blue-600
        
        // Border Colors
        'border': '#E2E8F0', // Minimal border color - slate-200
        'border-light': '#F1F5F9', // Light border color - slate-100
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Space Grotesk', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'sm': '6px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'integration': '0 2px 8px rgba(139, 92, 246, 0.15)', // Violet shadow
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)', // Indigo glow
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)',
        'glow-aqua': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)',
        'glow-teal': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'panel': 'ease-in-out',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '1000': '1000',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-integration': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
        'gradient-status': 'linear-gradient(90deg, #10B981 0%, #06B6D4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F111A 0%, #1E1E28 100%)',
        'gradient-neon': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
      },
    },
  },
  plugins: [],
}