/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155'
        },
        brand: {
          500: '#3B82F6',
          600: '#2563EB'
        },
        accent: {
          500: '#F97316'
        }
      }
    },
  },
  plugins: [],
}
