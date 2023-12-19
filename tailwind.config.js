/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        "black-main": "#0a0a0a",
        "black-secondary": "#171717",
        "black-ultra-light": "#1f1f1f",
        "black-search-bar": "#141414",
        "black-search-bar-placeholder": "#717171",
        "white-text-main": "#fbfbfb",
        "pink-primary": "#fc3c44", // fd4cea fc3c44
        "pink-secondary": "#f94c57", // ff95f4 f94c57
      },
    },
  },
  plugins: [],
};
