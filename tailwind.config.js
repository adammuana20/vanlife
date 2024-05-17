/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-color': '#ff8c38',
        'semi-black': '#161616',
        'dark-red': '#cc0000',
        'dark-gray': '#4d4d4d',
        'grayish': '#aaa',
        'light-orange': '#FFF7ED',
        'light-gray': 'rgba(209, 213, 219)',
        'semi-light-orange': '#ffead0',
        'semi-orange': '#ffddb2',
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
      },
    },
  },
  plugins: [],
}

