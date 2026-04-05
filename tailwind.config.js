/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./home.html",
    "./about.html",
    "./contact.html",
    "./**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Foundation Colors from Design System
        background: '#09090B',
        foreground: '#FAFAFA',
        muted: '#27272A',
        'muted-foreground': '#A1A1AA',
        
        // Accent Colors
        accent: '#DFE104',
        'accent-foreground': '#000000',
        border: '#3F3F46',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Responsive scales using clamp
        'display-hero': ['clamp(3rem, 12vw, 14rem)', { lineHeight: '0.85', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['clamp(1.875rem, 5vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-md': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.5' }],
        body: ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        // 4px base unit
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      animation: {
        'marquee': 'marquee var(--marquee-duration, 30s) linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        slower: '800ms',
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
