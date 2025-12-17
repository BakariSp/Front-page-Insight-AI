/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Slower blob animation for better performance
        blob: "blob 20s infinite",
        // Floating animation for hero image
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "50%": {
            transform: "translate3d(15px, -25px, 0) scale(1.05)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "50%": {
            transform: "translate3d(0, -12px, 0)",
          },
        },
      },
    },
  },
  plugins: [],
}

