/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textgreen: "#56ca23",
        buttongreen: "#57CC99",
        darkgreen: "#327c1c",
        bgwhite: " #f5f5f5"
      },
    },
  },
  // plugins: [require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark", "cupcake"],
  // },
}