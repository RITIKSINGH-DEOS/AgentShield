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
        background: "#160e29",
        "surface-canvas": "#1d1338",
        "surface-card": "#261a48",
        "surface-card-hover": "#332261",
        "surface-border": "#452e7c",
        "surface-border-light": "rgba(255, 255, 255, 0.12)",
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
        "purple-glow": "0 0 35px -5px rgba(168, 85, 247, 0.4)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
