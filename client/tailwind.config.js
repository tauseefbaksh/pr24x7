/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist Dark Navy - Primary
        primary: {
          50: '#f0f4f9',
          100: '#e0e9f3',
          200: '#c1d3e7',
          300: '#8bb1d9',
          400: '#5589cb',
          500: '#1e3a5f',  // Main navy
          600: '#1a2d4a',
          700: '#162438',
          800: '#121c2e',
          900: '#0f1620',
          950: '#0a0f18',
        },
        // Soft Accent - Teal/Cyan
        accent: {
          50: '#f0f9fb',
          100: '#dff3f7',
          200: '#bce8f0',
          300: '#7fd4e8',
          400: '#40bfd4',
          500: '#06b6d4',  // Main teal
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Neutral Grays for clean aesthetic
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(30, 58, 95, 0.05)',
        'subtle-lg': '0 10px 24px rgba(30, 58, 95, 0.08)',
        'subtle-xl': '0 20px 40px rgba(30, 58, 95, 0.1)',
      }
    },
  },
  plugins: [],
}
