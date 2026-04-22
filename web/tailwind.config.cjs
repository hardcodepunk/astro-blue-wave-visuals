/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ocean: "rgb(var(--ocean) / <alpha-value>)",
        black: "#000000",
      },
      fontFamily: {
        sans: ["Andada Pro", "serif"],
        display: ["Nighty", "sans-serif"],
      },
    },
  },
  plugins: [],
}
