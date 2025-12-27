/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", // make sure it includes tsx files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
