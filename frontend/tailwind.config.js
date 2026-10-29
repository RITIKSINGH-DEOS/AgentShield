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
        background: "#090A0F",
        surface: "#11131B",
        "surface-border": "#1E2230",
        "surface-card": "#161924",
        accent: "#00E6FF",
        "accent-glow": "rgba(0, 230, 255, 0.15)",
        paypal: "#0070BA",
        "paypal-gold": "#FFC439",
        danger: "#FF3366",
        warning: "#FFB020",
        success: "#00E599",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
