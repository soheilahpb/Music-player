/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
  extend: {
    boxShadow: {
      'main-box': '2px 4px 8px 0px rgba(24, 128, 248, 0.568)',
    }
  },
  },
  plugins: [],
  }