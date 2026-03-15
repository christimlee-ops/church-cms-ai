import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4f8",
          100: "#d6e1ed",
          200: "#adc3db",
          300: "#84a5c9",
          400: "#5b87b7",
          500: "#2f5f93",
          600: "#28527f",
          700: "#21446b",
          800: "#1a3757",
          900: "#132943",
          950: "#0c1b2d",
        },
        navy: {
          50: "#f0f4f8",
          100: "#d6e1ed",
          200: "#adc3db",
          300: "#84a5c9",
          400: "#5b87b7",
          500: "#2f5f93",
          600: "#28527f",
          700: "#21446b",
          800: "#1a3757",
          900: "#132943",
          950: "#0c1b2d",
        },
        gold: {
          50: "#fdf9ef",
          100: "#f9f0d4",
          200: "#f0dfa5",
          300: "#e5ca6f",
          400: "#d9b458",
          500: "#c9a84c",
          600: "#b08a3a",
          700: "#926c2e",
          800: "#7a5727",
          900: "#664823",
        },
        secondary: {
          50: "#f8f7f5",
          100: "#e8e7e4",
          200: "#d0cfcc",
          300: "#a8a7a3",
          400: "#80807b",
          500: "#666b68",
          600: "#4d514f",
          700: "#343836",
          800: "#1c1b19",
          900: "#0e0e0d",
        },
        church: {
          cream: "#fefcf8",
          light: "#f7f5f0",
          warm: "#faf8f5",
        },
      },
      fontFamily: {
        heading: ["var(--font-raleway)", "sans-serif"],
        body: ["var(--font-epilogue)", "sans-serif"],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
