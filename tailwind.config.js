/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          50: "#f4faff",
          100: "#dbeefe",
          200: "#b7d7fe",
          300: "#8fc0fe",
          400: "#63a8fe",
          500: "#3B82F6",
          600: "#2a6fe0",
          700: "#1e5fcc",
          800: "#184eab",
          900: "#123b87",
        },
      },
    },
  },
  plugins: [],
}
