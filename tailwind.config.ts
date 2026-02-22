import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8fb",
          100: "#dceef6",
          500: "#1b82c3",
          600: "#166ea5",
          700: "#115782"
        }
      }
    }
  },
  plugins: []
};

export default config;
