/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a78bfa",
          "secondary": "#c4b5fd",
          "accent": "#a5f3fc",
          "neutral": "#181A2A",
          "base-100": "#fcfcfc",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
