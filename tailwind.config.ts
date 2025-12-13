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
      padding: {
        DEFAULT: '20px',
        lg: '80px',
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1200px',
      },
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        fraunces: ['var(--font-fraunces)', 'serif'],
        caudex: ['var(--font-caudex)', 'serif'],
      },
      colors: {
        'bg-primary': 'hsl(var(--bg-primary) / <alpha-value>)',
        'bg-secondary': 'hsl(var(--bg-secondary) / <alpha-value>)',
        'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
        'border-primary': 'hsl(var(--border-primary) / <alpha-value>)',
        'accent-primary': 'hsl(var(--accent-primary) / <alpha-value>)',
        'accent-secondary': 'hsl(var(--accent-secondary) / <alpha-value>)',
        'accent-glow': 'hsl(var(--accent-glow) / <alpha-value>)',
        'ring-color': 'hsl(var(--ring-color) / <alpha-value>)',
        'dot-color': 'hsl(var(--dot-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}

export default config
