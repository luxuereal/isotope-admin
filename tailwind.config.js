/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      'xs': '420px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      matter: ["Matter", "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      red: colors.red,
      grayback: '#f5f5f5',
      border: '#e3e8f2',
      normaltext: '#52678e',
      sidetext: '#959eb0',
      deepback: '#353a3f',
      blue: '#3576f4',
      yellow: '#fac137',
      green: '#16b188',
      violet: '#7b61ff',
      pink: '#ce2a96',
      deepbackhover: '#404a4f',
      bordermain: '#D5DDEC',
    }
  },
  plugins: [],
}
