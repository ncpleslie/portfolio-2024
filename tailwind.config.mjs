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
      },
      colors: {
        "accent-one": withOpacity("--color-accent-one"),
        "accent-two": withOpacity("--color-accent-two"),
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
          "--color-accent-one": "255, 138, 0",
          "--color-accent-two": "229, 46, 113",
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
        });
    }),
  ],
};
