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
      animation: {
        loading: 'loading 2.5s infinite'
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-150%)' },
          '50%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        boxShadow: {
          'light': '0 30px 30px rgba(255, 255, 255, 0.05)',
        }
      },
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    }
  },
  plugins: [],
}

