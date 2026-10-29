/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0919",
        "surface-canvas": "#110d22",
        "surface-card": "#17132c",
        "surface-card-hover": "#1e1938",
        "surface-border": "#282046",
        "surface-border-light": "rgba(255, 255, 255, 0.07)",
        "brand-violet": "#8b5cf6",
        "brand-purple": "#a855f7",
        "brand-fuchsia": "#d946ef",
        "brand-indigo": "#6366f1",
        danger: "#ff3366",
        warning: "#ffb020",
        success: "#00e599",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "purple-glow": "0 0 35px -5px rgba(139, 92, 246, 0.3)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
