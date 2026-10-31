import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '20px', md: '32px', lg: '48px' },
      screens: { sm: '375px', md: '768px', lg: '1120px' },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        /* --- StablePay logo blue --- */
        brand: {
          50: '#EEF3FF',
          100: '#DCE6FF',
          200: '#BCCEFF',
          300: '#8FADFF',
          400: '#5B84FF',
          500: '#235EFE', // logo blue
          600: '#1546D9',
          700: '#1035A8',
          800: '#0E2C85',
          900: '#0F2A6B',
        },
        /* --- StablePay logo gold / Tectonic Gold #FFC517 --- */
        gold: {
          50: '#FFFAEB',
          100: '#FFF2C7',
          200: '#FFE68A',
          300: '#FFD84D',
          400: '#FFC822', // logo gold
          500: '#F0AE00',
          600: '#C98500',
          700: '#8F5E00',
        },
        /* --- StablePay logo orange --- */
        ember: {
          50: '#FFF3EE',
          100: '#FFE2D5',
          200: '#FFC3AB',
          300: '#FF9A73',
          400: '#FD6724', // logo orange
          500: '#E44A0C',
          600: '#B8380A',
        },
        /* --- Tectonic forest green: health / positive --- */
        forest: {
          50: '#EDF7ED',
          100: '#D2ECD2',
          400: '#3AAE3A',
          500: '#228B22', // Tectonic brand green
          600: '#1A6F1A',
        },
        ink: {
          DEFAULT: '#0A1633',
          900: '#0A1633',
          700: '#26324D',
          500: '#4A5875',
          400: '#6B7A99',
          300: '#93A0BA',
        },
        line: {
          DEFAULT: '#E4E9F2',
          soft: '#EFF2F8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F9FC',
          tint: '#F3F6FE',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.025em' }],
      },
      boxShadow: {
        xs: '0 1px 2px rgba(10, 22, 51, 0.05)',
        card: '0 1px 3px rgba(10, 22, 51, 0.06), 0 8px 24px -12px rgba(10, 22, 51, 0.12)',
        lift: '0 2px 6px rgba(10, 22, 51, 0.06), 0 24px 48px -20px rgba(10, 22, 51, 0.22)',
        brand: '0 8px 20px -8px rgba(35, 94, 254, 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-22px,0) scale(1.06)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 14s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
