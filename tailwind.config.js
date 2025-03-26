/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'nav': '1175px',  // Vlastní breakpoint pro navigaci
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Hacker/terminal theme
        'terminal-black': '#0A0E12',
        'terminal-dark': '#1A1E23',
        'terminal-green': '#50FA7B',
        'terminal-bright-green': '#69FF97',
        'terminal-cyan': '#8BE9FD',
        'terminal-purple': '#BD93F9',
        'terminal-pink': '#FF79C6',
        'terminal-yellow': '#F1FA8C',
        'terminal-orange': '#FFB86C',
        'terminal-red': '#FF5555',
        'terminal-white': '#F8F8F2',
        // Ocean theme
        'ocean-darkest': '#051628',
        'ocean-darker': '#0A192F',
        'ocean-dark': '#112240',
        'ocean-medium': '#1E3A5F',
        'ocean-light': '#5DA9E9',
        'ocean-gold': '#FFD700',
        // Modré odstíny pro vlny
        'wave-blue': '#5DA9E9',
        'wave-blue-light': '#8ACFFF',
        'wave-blue-dark': '#3A87D8',
        // Gold colors
        'gold': '#FFD700',
        'gold-light': '#FFEA9F',
        'gold-dark': '#E6C200',
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "wave": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "wave-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.5, boxShadow: "0 0 10px rgba(93, 169, 233, 0.5)" },
          "50%": { opacity: 1, boxShadow: "0 0 20px rgba(93, 169, 233, 0.8)" }
        },
        "typing": {
          "from": { width: "0" },
          "to": { width: "100%" }
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#50FA7B" }
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "ocean-gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "gold-gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "glow-pulse": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.2)" }
        },
        "blob-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "blob-morph": {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" }
        },
        "wave-flow": {
          "0%": { transform: "translateX(0) scaleY(1)" },
          "50%": { transform: "translateX(-25%) scaleY(1.05)" },
          "100%": { transform: "translateX(-50%) scaleY(1)" }
        },
        "wave-flow-reverse": {
          "0%": { transform: "translateX(-50%) scaleY(1)" },
          "50%": { transform: "translateX(-25%) scaleY(1.05)" },
          "100%": { transform: "translateX(0) scaleY(1)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wave": "wave 40s linear infinite",
        "wave-slow": "wave 60s linear infinite",
        "wave-reverse": "wave-reverse 40s linear infinite",
        "wave-slow-reverse": "wave-reverse 60s linear infinite",
        "wave-flow": "wave-flow 35s ease-in-out infinite",
        "wave-flow-reverse": "wave-flow-reverse 35s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "typing": "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
        "matrix-rain": "matrix-rain 10s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "ocean-gradient": "ocean-gradient-shift 4s ease infinite",
        "gold-gradient": "gold-gradient-shift 3s ease infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "blob-rotate": "blob-rotate 20s linear infinite",
        "blob-morph": "blob-morph 10s ease-in-out infinite"
      },
      backgroundImage: {
        "terminal-grid": "linear-gradient(to right, rgba(80, 250, 123, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(80, 250, 123, 0.1) 1px, transparent 1px)",
        "wavy-grid": "linear-gradient(to right, rgba(80, 250, 123, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(80, 250, 123, 0.05) 1px, transparent 1px), radial-gradient(rgba(80, 250, 123, 0.1) 1.5px, transparent 1.5px)",
        "blue-grid": "linear-gradient(to right, rgba(93, 169, 233, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(93, 169, 233, 0.05) 1px, transparent 1px), radial-gradient(rgba(93, 169, 233, 0.1) 1.5px, transparent 1.5px)",
        "noise": "url('data:image/png;base64,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')",
        "deep-space": "radial-gradient(ellipse at bottom, #0A192F 0%, #050C17 100%)",
        "deep-ocean": "linear-gradient(135deg, #0A192F 0%, #112240 100%)",
        "enhanced-gradient": "linear-gradient(135deg, #050C17 0%, #0A192F 40%, #112240 80%, #1E3A5F 100%)",
        "terminal-gradient": "linear-gradient(135deg, #0A0E12 0%, #1A1E23 100%)",
        "cyber-grid": "linear-gradient(rgba(80, 250, 123, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 250, 123, 0.07) 1px, transparent 1px), linear-gradient(rgba(80, 250, 123, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 250, 123, 0.06) 1px, transparent 1px)",
        "cyber-grid-blue": "linear-gradient(rgba(93, 169, 233, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(93, 169, 233, 0.07) 1px, transparent 1px), linear-gradient(rgba(93, 169, 233, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(93, 169, 233, 0.06) 1px, transparent 1px)",
        "hacker-gradient": "linear-gradient(45deg, #0A0E12 0%, #133926 100%)",
        "ocean-gradient": "linear-gradient(45deg, #051628 0%, #1E3A5F 100%)",
      },
      backgroundSize: {
        'cyber-grid': '100px 100px, 100px 100px, 20px 20px, 20px 20px'
      },
      boxShadow: {
        'neon-green': '0 0 5px rgba(80, 250, 123, 0.5), 0 0 10px rgba(80, 250, 123, 0.2)',
        'neon-cyan': '0 0 5px rgba(139, 233, 253, 0.5), 0 0 10px rgba(139, 233, 253, 0.2)',
        'neon-purple': '0 0 5px rgba(189, 147, 249, 0.5), 0 0 10px rgba(189, 147, 249, 0.2)',
        'neon-blue': '0 0 5px rgba(93, 169, 233, 0.5), 0 0 10px rgba(93, 169, 233, 0.2)',
        'ocean-gold': '0 4px 10px rgba(255, 215, 0, 0.2), 0 6px 12px rgba(255, 215, 0, 0.1)',
        'ocean-light': '0 4px 10px rgba(93, 169, 233, 0.2), 0 6px 12px rgba(93, 169, 233, 0.1)',
        'ocean-glow': '0 0 15px rgba(93, 169, 233, 0.5), 0 0 30px rgba(93, 169, 233, 0.3)',
      },
      ringColor: {
        'neon-green': 'rgba(80, 250, 123, 0.5)',
        'neon-cyan': 'rgba(139, 233, 253, 0.5)',
        'neon-blue': 'rgba(93, 169, 233, 0.5)',
      },
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fill-small': 'repeat(auto-fill, minmax(220px, 1fr))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 