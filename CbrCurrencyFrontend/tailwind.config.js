/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009999',
          light: '#00b3b3',
          dark: '#007a7a',
        },
        accent: '#009999',
        dark: '#000000',
        gray: {
          DEFAULT: '#999999',
          light: '#cccccc',
          dark: '#666666',
          300: '#d1d5db',  // для border-gray-300
        },
        light: '#ffffff',
      },
      // Альтернативный способ - переопределить backgroundColor
      backgroundColor: {
        'gray-dark': '#666666',
        'white': '#ffffff',
      }
    },
  },
  plugins: [],
}