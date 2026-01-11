/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./student_screens/**/*.html",
    "./teacher_screens/**/*.html",
    "./admin_screens/**/*.html",
    "./assets/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4ade80",
          dark: "#22c55e",
          light: "#86efac",
        },
        background: {
          light: "#FDFBF7",
          dark: "#102213",
        },
        surface: {
          light: "#ffffff",
          dark: "#1a2c2a",
        },
        text: {
          dark: "#2d3748",
          light: "#4a5568",
          muted: "#6b7280",
        },
        soft: {
          purple: "#E9D5FF",
          pink: "#FBCFE8",
          green: "#D1FAE5",
        },
      },
      fontFamily: {
        display: ["'IBM Plex Sans Arabic'", "Lexend", "sans-serif"],
        body: ["'IBM Plex Sans Arabic'", "Lexend", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(74, 222, 128, 0.3)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        spin: "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideIn: {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        spin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
