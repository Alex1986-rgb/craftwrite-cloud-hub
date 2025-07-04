
import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
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
        // Brand colors (from unified design system)
        brand: {
          50: 'rgb(240 249 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
        },
        // Neutral colors
        neutral: {
          50: 'rgb(248 250 252)',
          100: 'rgb(241 245 249)',
          200: 'rgb(226 232 240)',
          300: 'rgb(203 213 225)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          600: 'rgb(71 85 105)',
          700: 'rgb(51 65 85)',
          800: 'rgb(30 41 59)',
          900: 'rgb(15 23 42)',
        },
        // Semantic colors
        success: 'rgb(16 185 129)',
        warning: 'rgb(245 158 11)',
        error: 'rgb(244 63 94)',
        info: 'rgb(59 130 246)',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "bounce-soft": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-8px)" },
          "60%": { transform: "translateY(-4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { textShadow: "0 0 5px rgba(59, 130, 246, 0.3)" },
          "50%": { textShadow: "0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "morph": {
          "0%": { transform: "scale(1) rotateY(0deg)" },
          "50%": { transform: "scale(1.05) rotateY(180deg)" },
          "100%": { transform: "scale(1) rotateY(360deg)" },
        },
        "spatial-float": {
          "0%, 100%": { transform: "translateY(0px) translateZ(0px)" },
          "33%": { transform: "translateY(-10px) translateZ(20px)" },
          "66%": { transform: "translateY(5px) translateZ(-10px)" },
        },
        "liquid-flow": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.1) rotate(180deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            filter: "brightness(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.4)",
            filter: "brightness(1.2)"
          },
        },
        "text-reveal": {
          "0%": { 
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            opacity: "0"
          },
          "100%": { 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: "1"
          },
        },
        "magnetic-hover": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-2px, -4px) scale(1.02)" },
          "100%": { transform: "translate(0, -8px) scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-soft": "bounce-soft 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        "morph": "morph 3s ease-in-out infinite",
        "spatial-float": "spatial-float 8s ease-in-out infinite",
        "liquid-flow": "liquid-flow 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-reveal": "text-reveal 1.5s ease-out forwards",
        "magnetic-hover": "magnetic-hover 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
