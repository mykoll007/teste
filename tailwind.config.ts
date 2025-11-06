import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#0a0a0a",
          800: "#1a1a1a",
          700: "#2d2d2d",
          600: "#3f3f3f",
          400: "#a1a1a1",
          100: "#fafafa",
        },
      },
    },
  },
  plugins: [],
};

export default config;
