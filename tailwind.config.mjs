const plugin = require("tailwindcss/plugin");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Monoton", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        "sub-heading": ["'Share Tech Mono'", "sans-serif"],
        resume: ["Merriweather", "Georgia", "serif"],
      },
      colors: {
        "accent-one": withOpacity("--color-accent-one"),
        "accent-two": withOpacity("--color-accent-two"),
        "bg-primary": withOpacity("--color-bg-primary"),
        "bg-secondary": withOpacity("--color-bg-secondary"),
        "bg-hover": withOpacity("--color-bg-hover"),
        "bg-card-hover": withOpacity("--color-bg-hover"),
        "text-primary": withOpacity("--color-text-primary"),
        "text-secondary": withOpacity("--color-text-secondary"),
        "text-tertiary": withOpacity("--color-text-tertiary"),
        "border-primary": withOpacity("--color-border"),
      },
      keyframes: {
        "rotate-and-grow": {
          "0%": {
            transform: "rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "rotate(0deg) scale(1.5)",
          },
          "100%": {
            transform: "rotate(360deg) scale(1)",
          },
        },
      },
      animation: {
        "rotate-and-grow": "rotate-and-grow 20s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        html: {
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "scroll-behavior": "smooth !important",
        },
        ":root": {
          "--color-accent-one": "6, 182, 212",
          "--color-accent-two": "168, 85, 247",
          // Light mode colors
          "--color-bg-primary": "248, 250, 252", // slate-50 - soft cool white
          "--color-bg-secondary": "226, 232, 240", // slate-200 - cool light gray
          "--color-bg-hover": "241, 245, 249", // slate-100 - subtle cool hover
          "--color-bg-card-hover": "241, 245, 249", // slate-100 - subtle cool hover
          "--color-text-primary": "15, 23, 42", // slate-900 - deep cool black
          "--color-text-secondary": "51, 65, 85", // slate-700 - medium cool gray
          "--color-text-tertiary": "148, 163, 184", // slate-400 - light cool gray
          "--color-border": "203, 213, 225", // slate-300 - soft border
        },
        ".dark": {
          // Dark mode colors
          "--color-bg-primary": "15, 23, 42", // slate-900 - deep modern dark
          "--color-bg-secondary": "51, 65, 85", // slate-700 - elevated surface
          "--color-bg-hover": "30, 41, 59", // slate-800 - subtle hover
          "--color-bg-card-hover": "241, 245, 249", // slate-100 - subtle cool hover
          "--color-text-primary": "248, 250, 252", // slate-50 - crisp white
          "--color-text-secondary": "203, 213, 225", // slate-300 - readable gray
          "--color-text-tertiary": "148, 163, 184", // slate-400 - muted text
          "--color-border": "71, 85, 105", // slate-600 - subtle borders
        },
      });
      addUtilities({
        ".fancy": {
          background: `linear-gradient(
            90deg,
            ${theme("colors.accent-one")},
            ${theme("colors.accent-two")}
          )`,
          textShadow: "none",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "250ms",
        },
      }),
        addComponents({
          ".blob": {
            "will-change": "transform",
            position: "absolute",
            "pointer-events": "none",
            "background-color": "white",
            height: "35vmax",
            "aspect-ratio": "1",
            position: "absolute",
            left: "50%",
            top: "50%",
            "z-index": "-10",
            translate: "-50% -50%",
            "border-radius": "50%",
            background: `linear-gradient(to right, ${theme(
              "colors.accent-one",
            )}, ${theme("colors.accent-two")})`,
            transform: "translateZ(0)",
            "backface-visibility": "hidden",
          },
          ".blur": {
            "will-change": "transform",
            height: "120%",
            width: "100%",
            position: "absolute",
            "z-index": "-2",
            "backdrop-filter": "blur(4vmax)",
            translate: "-50% -50%",
            left: "50%",
            top: "50%",
            transform: "translateZ(0)",
            "backface-visibility": "hidden",
          },

          ".fancy": {
            background: `linear-gradient(
          90deg,
          ${theme("colors.accent-one")},
          ${theme("colors.accent-two")}
        )`,
            textShadow: "none",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "250ms",
          },

          // Global focus styles for accessibility
          "a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible":
            {
              outline: `2px solid ${theme("colors.accent-one")}`,
              outlineOffset: "2px",
              borderRadius: "4px",
            },

          // Hide elements when printing
          "@media print": {
            ".no-print": {
              display: "none !important",
            },
          },
        });
    }),
  ],
};
