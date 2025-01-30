import type { Config } from "tailwindcss";

export default {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xsmall: "576px",
        small: "767px",
        medium: "991px",
        large: "1199px",
        huge: "1469px",
      },
      colors: {
        white: "#fff",
        black: "#333",
        dark: "#000",
        pageBackground: "#f8e0d4",
        error: "#df1b41",
      },
    },
  },
  plugins: [],
} as Config;
