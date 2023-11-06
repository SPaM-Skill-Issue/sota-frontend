/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Montserrat'],
        'body': ['Noto Sans'],
      },
      colors: {
        'background': '#1B2021',
        'hunyadi-yellow': '#DBA94D',
        'rufous-red': '#9B2915',
        'shamrock-green': '#4C9F70',
        'belft-blue': '#213555',
        'belft-blue-light': '#3E586C',
        'eeric-black': '#1B2021',
        'eeric-black-light': '#393F3F',
        'grey': '#949896',
        'gold-medal': '#D6AF36',
        'silver-medal': '#A7A7AD',
        'bronze-medal': '#824A02',
      },
    },
  },
  plugins: [],
}