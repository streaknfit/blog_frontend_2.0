/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42a7f5',
          light: '#79fcb6',
          dark: '#1e88e5',
        },
        secondary: {
          DEFAULT: '#79fcb6',
          dark: '#54e3a1',
        },
      },
    },
  },
  plugins: [],
};
