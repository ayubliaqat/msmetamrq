/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeSlideDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(20px, 20px)" },
        },
      },
      animation: {
        fadeSlideDown: "fadeSlideDown 0.8s ease both",
        float:         "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}