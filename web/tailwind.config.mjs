module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: "#1C2C35",
        sand: "#F2E9E0",
        coral: "#F7B7A3",
        foam: "#B9E4CF",
        paper: "#FAFAF8",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
