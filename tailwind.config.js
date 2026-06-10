/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#5bf2ff',
          400: '#00ffd8',
          500: '#00e1be',
          900: '#023028',
        },
        green: {
          400: '#a855f7', // Map green to violet for retro-wave aesthetic
          500: '#8b5cf6',
        },
        pink: {
          400: '#ff2e93',
          500: '#e01676',
          900: '#3e061d',
        },
        orange: {
          400: '#ff5a36',
          500: '#e0421d',
        },
      },
    },
  },
  plugins: [],
};
