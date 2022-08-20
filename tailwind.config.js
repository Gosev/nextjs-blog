const { colors,fontSize } = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  //purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'display': ['Poppins', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      'body': ['"Noto Sans"', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: { ...colors.gray, '100':"#FAF9F8", '200':"#ededed" }, //"#e2e2e2
      red:           '#ff5d55',
      orange:        '#FFAC58',
      yellow:        '#ffa834',
      darkgreen:     '#469936',
      green:         '#8FC01F',
      lightgreen:    '#BBD877',
      logogray:      '#575756',
      hmred:         '#d6001c',
      beige:         '#EEEAE5',
      darkgray:      '#434343',
      dark:          '#3D3D3D',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
