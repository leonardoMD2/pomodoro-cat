/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
            "./src/*.{js,ts,jsx,tsx}",
            "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'common-violet': "#646cffaa",
      }
    },
  },
  plugins: [],
}

