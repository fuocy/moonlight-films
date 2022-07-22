const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-lighten": "#161616",
        primary: "#5179ff",
        // primary: "#bd0000",
        // primary: "#186db6",
        "gray-lighten": "#989898",
        "gray-darken": "#3a3939",
        dark: "#1C1C1E",
        "dark-darken": "#19191b",
        "dark-lighten": "#333335",
      },
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
