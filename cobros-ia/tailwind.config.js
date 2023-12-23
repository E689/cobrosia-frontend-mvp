/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('/home-bg.jpg')"
      },
      colors: {
        'brand-color': '#00DAC6',
        'darkbg': '#545479',
        'lightbg': '#E8F3F1',
        'dark-green': '#133A29',
        'classy-light-blue': '#83C5FF',
        'classy-blue': '#4290E2',
        'switch-purple': '#A12697',
      }
    }
  },
  plugins: [],
}
