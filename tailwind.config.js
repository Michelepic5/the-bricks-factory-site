/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lego: {
          green: '#3ef639',
          red: '#ca2620',
          yellow: '#FFD700',
          blue: '#0055BF',
          white: '#FFFFFF',
          black: '#111111',
        }
      },
      fontFamily: {
        lego: ['"Russo One"', 'sans-serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

