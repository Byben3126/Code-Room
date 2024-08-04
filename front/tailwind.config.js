/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFDF6',
      'beige': '#FBF4DD',
      'brown': '#3F292B',
      'blue': '#9ACFE1',
      'red' : 'rgb(239 68 68)'
    },
    extend: {},
  },
  plugins: [],
}

