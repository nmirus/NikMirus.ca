module.exports = {
  theme: {
    colors: {
      transparent: "transparent",

      black: "#000",
      white: "#fff",
      "off-white": "#FAF9F8",

      gray: {
        100: "#f1f1f1",
        200: "#e3e3e3",
        300: "#ddd",
        400: "#ccc",
        500: "#aaa",
        600: "#777",
        700: "#444",
        800: "#222",
        900: "#111",
      },

      bGreen: "#CACECD",
      bPink: "#CDC7C5",

      debug: "#ff0000",
    },
    borderWidth: {
      default: "0.1em",
      "0": "0",
    },
    fontFamily: {
      sans: [
        "Founders Grotesk",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },

    extend: {
      opacity: {
        20: 0.2,
        50: 0.5,
        90: 0.9,
      },

      maxWidth: {
        paragraph: "15ch",
      },

      fontSize: {
        sm: "0.955rem",
      },

      padding: {
        full: "100%",
      },
    },
  },
  variants: {
    display: ["responsive", "hover"],
  },
  plugins: [],
}
