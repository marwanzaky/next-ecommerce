/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      padding: '15rem',
    }
  },
  plugins: [],
}
