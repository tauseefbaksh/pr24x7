/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Navy - Primary Brand Color
        primary: {
          50: '#e6edf5',
          100: '#ccdaeb',
          200: '#99b5d7',
          300: '#6690c3',
          400: '#336baf',
          500: '#00469b',
          600: '#003a7c',
          700: '#002d5d',
          800: '#001f3e',
          900: '#001a4d',  // Main corporate navy
          950: '#00101f',
        },
        // Accent Orange - Call-to-action Color
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Main orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Neutral Grays
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
        'corporate': '0 4px 6px -1px rgba(0, 26, 77, 0.1), 0 2px 4px -1px rgba(0, 26, 77, 0.06)',
        'corporate-lg': '0 10px 15px -3px rgba(0, 26, 77, 0.1), 0 4px 6px -2px rgba(0, 26, 77, 0.05)',
        'corporate-xl': '0 20px 25px -5px rgba(0, 26, 77, 0.1), 0 10px 10px -5px rgba(0, 26, 77, 0.04)',
      }
    },
  },
  plugins: [],
}