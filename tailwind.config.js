/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],
  },
}

