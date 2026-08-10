/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      colors: {
        ink: "#1f2328",
        paper: "#faf9f6",
        brand: "#2f5d50",
      },
    },
  },
  plugins: [],
};