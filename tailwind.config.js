/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },

  animation: {
    ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
  },
  keyframes: {
    ripple: {
      "0%, 100%": {
        transform: "translate(-50%, -50%) scale(1)",
      },
      "50%": {
        transform: "translate(-50%, -50%) scale(0.9)",
      },
    },
  },
  plugins: [],
}

