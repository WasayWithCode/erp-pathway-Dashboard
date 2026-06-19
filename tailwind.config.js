/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        primary: "#2563EB",
        secondary: "#7C3AED",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        surface: "#FFFFFF",
        muted: "#64748B",
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
      backgroundImage: {
        "gradient-dashboard": "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #8B5CF6 100%)",
        "gradient-premium": "linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(6, 182, 212, 0.14), rgba(139, 92, 246, 0.18))",
      },
    },
  },
  plugins: [],
}
