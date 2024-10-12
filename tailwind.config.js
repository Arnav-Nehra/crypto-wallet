/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:"class",
  theme: {
    extend: {
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
        slidein300: "slidein 1s ease 300ms forwards",
        slidein500: "slidein 1s ease 500ms forwards",
        slidein700: "slidein 1s ease 700ms forwards",
      },
      colors:{
        custompurple:"#522258",
        custommaroon:"#8C3061",
        customred:"#C63C51",
        customorange:"#D95F59",
        customBlack:"#181C14",
        customGray:"#3C3D37",
        customTeal:"#697565",
        customBeige:"#ECDFCC"
      }
    },
  },
  plugins: [],
};