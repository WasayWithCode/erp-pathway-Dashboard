/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070A12",
        surface: "#0F172A",
        primary: "#3B82F6",
        secondary: "#06B6D4",
        accent: "#8B5CF6",
        muted: "#94A3B8",
      },
      boxShadow: {
        glow: "0 0 80px rgba(59, 130, 246, 0.22)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.32)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "slow-spin": "slow-spin 18s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "slow-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
}
