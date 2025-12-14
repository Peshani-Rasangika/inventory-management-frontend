/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "'Segoe UI'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "'Segoe UI'", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f2f7ff",
          100: "#e4edff",
          200: "#c7d9fe",
          300: "#99bbfb",
          400: "#5d93f7",
          500: "#2f6df3",
          600: "#1f53d6",
          700: "#1c45ae",
          800: "#1a3b8a",
          900: "#183571",
        },
      },
      boxShadow: {
        soft: "0 20px 50px -20px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};
