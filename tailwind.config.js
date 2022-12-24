const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#232426",
        primary2: "#3b3b3b",
        primary3: "#222426",
        secondary: "#EEEEEE",
        secondary2: "#A6A6A6",
        secondary3: "#9EB1AF",
        accent: "#00ADB5",
        accent2: "#aa56ff",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
});
