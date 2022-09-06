/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'selected-yellow': '#ffc85726',
        'background-content': '#F6F7FC',
        black: '#0A0A0A',
        yellow: '#FFD24D',
        primary: '#7342CC',
        darkPrimary: '#452680',
        darkGray: '#404040',
        softGray: '#757575',
      },
    },
  },
  plugins: [],
};
