import type { Config } from "tailwindcss";

export default {
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
      },
    },
  },
  plugins: [],
} as Config;
