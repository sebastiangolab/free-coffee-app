import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        small: "480px",
        medium: "768px",
        large: "976px",
        huge: "1440px",
      },
      colors: {
        white: "#fff",
        black: "#333",
      },
    },
  },
  plugins: [],
} as Config;
