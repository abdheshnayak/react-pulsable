/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],

  keyframes: {
    shimmer: {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },
};
