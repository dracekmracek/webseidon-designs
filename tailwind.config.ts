import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        ocean: {
          darker: '#0A192F',
          dark: '#172A45',
          medium: '#2E5984',
          light: '#5DA9E9',
          lighter: '#A8DAF5'
        },
        'deep-ocean': '#05101F',
        'ocean-darkest': '#041018',
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFEA9F',
          dark: '#E6C200'
        },
        terminal: {
          black: '#282a36',
          red: '#ff5555',
          green: '#50fa7b',
          yellow: '#f1fa8c',
          blue: '#6272a4',
          magenta: '#ff79c6',
          cyan: '#8be9fd',
          white: '#f8f8f2',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'wave-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'wave-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-30%)' }
        },
        'wave-slow-reverse': {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'wave-fast': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-70%)' }
        },
        'wave-fast-reverse': {
          '0%': { transform: 'translateX(-70%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'bounce-wave': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'bounce-wave-slow': {
          '0%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(-5px)' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'type-cursor': {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-5px, 5px)' },
          '50%': { transform: 'translate(-5px, -5px)' },
          '75%': { transform: 'translate(5px, 5px)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)' },
          '80%, 100%': { opacity: '0' }
        },
        'water-drop': {
          '0%': { transform: 'scale(0)', opacity: '0.7' },
          '50%': { transform: 'scale(1)', opacity: '0.4' },
          '100%': { transform: 'scale(1.5)', opacity: '0' }
        },
        'trident-thrust': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(-5deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) rotate(5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' }
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(100%) scale(0.3)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100%) scale(1)', opacity: '0' }
        },
        'whirlpool': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.8)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        'sea-sway': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'wave': 'wave 25s linear infinite',
        'wave-reverse': 'wave-reverse 20s linear infinite',
        'wave-slow': 'wave-slow 37s linear infinite',
        'wave-slow-reverse': 'wave-slow-reverse 32s linear infinite',
        'wave-fast': 'wave-fast 18s linear infinite',
        'wave-fast-reverse': 'wave-fast-reverse 15s linear infinite',
        'bounce-wave': 'bounce-wave 8s ease-in-out infinite',
        'bounce-wave-slow': 'bounce-wave-slow 12s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-up': 'float-up 3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'rotate-slow': 'rotate-slow 12s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'type-cursor': 'type-cursor 0.8s ease-in-out infinite',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'water-drop': 'water-drop 2s ease-out forwards',
        'trident-thrust': 'trident-thrust 6s ease-in-out infinite',
        'bubble-rise': 'bubble-rise 8s ease-in-out infinite',
        'whirlpool': 'whirlpool 8s ease-in-out infinite',
        'sea-sway': 'sea-sway 6s ease-in-out infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #E6C200 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #0A192F 0%, #2E5984 100%)',
        'ocean-ripple': 'radial-gradient(circle at center, #5DA9E9 0%, transparent 70%)',
        'ocean-gold-gradient': 'linear-gradient(135deg, #172A45 0%, #5DA9E9 70%, #FFD700 100%)',
        'wave-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%235DA9E9' fill-opacity='0.3' d='M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,165.3C672,128,768,64,864,64C960,64,1056,128,1152,149.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
        'terminal-grid': 'linear-gradient(#6272a4 1px, transparent 1px), linear-gradient(90deg, #6272a4 1px, transparent 1px)',
        'poseidon-trident': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235DA9E9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v14M4 9h16M7 3v5M17 3v5'/%3E%3C/svg%3E\")",
        'coral-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='none'%3E%3Cpath d='M30,10 Q40,0 50,10 Q60,20 70,10' stroke='%235DA9E9' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3Cpath d='M30,30 Q40,20 50,30 Q60,40 70,30' stroke='%235DA9E9' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3Cpath d='M30,50 Q40,40 50,50 Q60,60 70,50' stroke='%235DA9E9' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3Cpath d='M30,70 Q40,60 50,70 Q60,80 70,70' stroke='%235DA9E9' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3Cpath d='M30,90 Q40,80 50,90 Q60,100 70,90' stroke='%235DA9E9' stroke-opacity='0.2' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
        'wave-dots': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='10' cy='50' r='2' fill='%235DA9E9' fill-opacity='0.2'/%3E%3Ccircle cx='30' cy='40' r='2' fill='%235DA9E9' fill-opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%235DA9E9' fill-opacity='0.2'/%3E%3Ccircle cx='70' cy='40' r='2' fill='%235DA9E9' fill-opacity='0.2'/%3E%3Ccircle cx='90' cy='50' r='2' fill='%235DA9E9' fill-opacity='0.2'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.3), 0 0 5px rgba(255, 215, 0, 0.2), inset 0 0 5px rgba(255, 215, 0, 0.05)',
        'ocean': '0 4px 14px 0 rgba(93, 169, 233, 0.3)',
        'ocean-gold': '0 10px 25px -3px rgba(93, 169, 233, 0.3), 0 4px 6px -4px rgba(255, 215, 0, 0.2)',
        'terminal': '0 0 0 2px rgba(139, 233, 253, 0.3), 0 0 0 4px rgba(139, 233, 253, 0.1)',
      },
      transitionTimingFunction: {
        'wave': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      backgroundSize: {
        '400%': '400% 400%',
      },
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(93, 169, 233, 0.2)',
        },
        '.text-gold-shimmer': {
          backgroundImage: 'linear-gradient(90deg, #E6C200, #FFD700, #FFEA9F, #FFD700, #E6C200)',
          backgroundSize: '200% auto',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 5s linear infinite',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          display: 'inline-block',
          position: 'relative',
        },
        '.text-gradient-fancy': {
          backgroundImage: 'linear-gradient(90deg, #FFD700, #FFEA9F, #FFD700)',
          backgroundSize: '200% auto',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shimmer 5s linear infinite',
        },
        '.text-gradient-ocean': {
          backgroundImage: 'linear-gradient(135deg, #5DA9E9 0%, #2E5984 100%)',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.hover-lift': {
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px -10px rgba(93, 169, 233, 0.4)',
          }
        },
        '.terminal-text': {
          fontFamily: 'JetBrains Mono, Consolas, monospace',
          color: '#f8f8f2',
          lineHeight: '1.5',
          position: 'relative',
        },
        '.terminal-prompt': {
          '&::before': {
            content: '"$ "',
            color: '#50fa7b',
          }
        },
        '.terminal-cursor': {
          '&::after': {
            content: '""',
            display: 'inline-block',
            width: '0.6em',
            height: '1.2em',
            backgroundColor: '#8be9fd',
            verticalAlign: 'text-bottom',
            animation: 'type-cursor 0.8s ease-in-out infinite',
          }
        },
        '.water-ripple': {
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'rgba(93, 169, 233, 0.2)',
            animation: 'ripple 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite',
          }
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        },
        '.shadow-glow': {
          boxShadow: '0 0 15px rgba(93, 169, 233, 0.3)',
        },
        '.shadow-glow-lg': {
          boxShadow: '0 0 30px rgba(93, 169, 233, 0.5)',
        },
        '.bg-wavy-grid': {
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(93, 169, 233, 0.1), rgba(93, 169, 233, 0.1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(93, 169, 233, 0.1), rgba(93, 169, 233, 0.1) 1px, transparent 1px, transparent 40px)',
        },
        '.bg-noise': {
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          opacity: '0.05',
        },
      });
    }),
  ],
} satisfies Config;
