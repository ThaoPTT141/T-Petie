
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBFC',
          100: '#FFF4F7',
          200: '#FAE6ED',
          300: '#F2D2DE',
        },
        sage: {
          50: '#F4FAF5',
          100: '#EAF4EC',
          500: '#77B77A',
          700: '#4B834E',
        },
        honey: {
          50: '#FFF5F8',
          100: '#FFE6EE',
          200: '#FACAD9',
          300: '#F3A6C0',
          400: '#EA85A8',
          500: '#DF6D96',
          600: '#C8507E',
          700: '#AD3C68',
          800: '#8F2F55',
          900: '#722443',
        },
        blush: {
          50: '#FFF5F5',
          100: '#FFEBEB',
          500: '#F2828D',
          600: '#E06D75',
        },
        charcoal: {
          400: '#98A1B0',
          700: '#4F5D75',
          900: '#2D3142',
        },
      },
      fontFamily: {
        heading: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
        sans: ['var(--font-be-vietnam-pro)', 'Be Vietnam Pro', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(223, 109, 150, 0.14)',
        card: '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
