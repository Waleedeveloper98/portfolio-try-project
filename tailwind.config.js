/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['gilroy', 'sans-serif'],
      },
      gradientColorStops: {
        // main gradient colors
        'main-color-start': '#011D19', // Dark green
        'main-color-end': '#042166',  // Dark blue

        // Nav gradient colors
        'nav-start': '#026063',      // Full opacity color
        'nav-end': 'rgba(0, 16, 56, 1)', // 20% opacity color
      },
      colors: {
        hColor: '#B3CFD0',
        plusColor : '#007F83' // Custom color
      },
      borderColor: {
        // Define your custom border colors
        'white-stroke': '#FFFFFF', // Full opacity color (white)
        'teal-stroke': 'rgba(2, 96, 99, 0.3)', // Second color with 30% opacity (teal)
        'teal-stroke-border': 'rgba(2, 96, 99, 0.7)', // Second color with 30% opacity (teal)
        'pure-teal': '#026063', // Define pure teal
        'form-border' : '#B3CFD0',
      },
      boxShadow: {
        'custom-blue': '0 1px 4px rgba(7, 247, 255, 0.2)', // Custom shadow color
      },
      stroke: {
        'svg-fill': '#B3CFD0', // Custom stroke color
      },
      fill: {
        'svg-fill': '#B3CFD0', // Custom fill color
      },

    },
  },
  plugins: [],
}

