/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "float-shape": "float-shape 6s ease-in-out infinite",
        "waveform": "waveform 1.2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-shape": {
          "0%, 100%": { transform: "translateY(0) rotate(45deg)", opacity: "0.4" },
          "50%": { transform: "translateY(-20px) rotate(90deg)", opacity: "0.8" },
        },
        "waveform": {
          "0%, 100%": { height: "4px" },
          "25%": { height: "16px" },
          "50%": { height: "8px" },
          "75%": { height: "20px" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(217, 70, 239, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(217, 70, 239, 0.25)" },
        },
        "spin-slow": {
          "from": { transform: "rotateX(15deg) rotateY(0deg)" },
          "to": { transform: "rotateX(15deg) rotateY(360deg)" },
        },
      },
    },
  },
  plugins: [],
}
