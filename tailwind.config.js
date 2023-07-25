/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#ef394e',
        darkRed: '#c6053e',
        primaryTextColor: '#333333',
        secondaryTextColor: '#b5b5b5',
        redTextColor: '#d60644',
      }
    },

    fontFamily: {
      IRANSans: ["IRANSans"]
    }
  },
  plugins: [],
}
