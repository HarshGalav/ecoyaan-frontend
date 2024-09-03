/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        width: "animate-width",
      },
      colors: {
        primary: "#50B166",
        secondary: "#107E9F",
        anchor: "#77AEBF",
        "primary-text": "#2D2D2D",
        "secondary-text": "#727272",
        "shadow-one": "#DDDDDD",
        "shadow-two": "#A6A6A6",
        "shadow-three": "#E7E7E7",
        "shadow-four": "#F8F8F8",
        lightBlue: "#F5FDFF",
        error: "#B3261E",
      },
      screens: {
        xs: "320px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
