/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",   // blue-600
        secondary: "#9333EA", // purple-600
        darkbg: "#0F172A",    // slate-900
        lightbg: "#F8FAFC"
      }
    }
  },
  plugins: []
};
