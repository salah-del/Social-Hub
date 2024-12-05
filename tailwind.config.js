export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "var(--main-color)",
        "sec-color": "var(--sec-color)",
        "third-color": "var(--third-color)",
      },
    },
  },
  plugins: [],
};
