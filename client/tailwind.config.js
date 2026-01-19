/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sensory: {
          light: '#FF6B6B',
          DEFAULT: '#FF5252',
          dark: '#E63946'
        },
        rational: {
          light: '#4ECDC4',
          DEFAULT: '#2A9D8F',
          dark: '#264653'
        },
        practice: {
          light: '#FFD93D',
          DEFAULT: '#F4A261',
          dark: '#E76F51'
        }
      }
    },
  },
  plugins: [],
}
