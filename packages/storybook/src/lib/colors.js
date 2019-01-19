const colors = {
  turquoise: {
    very_light: "#97DED9",
    very_light_2: "#62CDC6",
    light: "#2EBCB3",
    medium: "#1A8A84",
    dark: "#005753"
  },
  blue: {
    very_light: "#ADD2ED",
    very_light_2: "#84BBE4",
    light: "#5BA4DA",
    medium: "#4378A0",
    dark: "#234A67",
    very_dark: "#1B384E"
  },
  red: { light: "#E75C64", medium: "#A64046", dark: "#692025" },
  purple: {
    very_light: "#bd9fc6",
    light: "#A076AC",
    medium: "#74557E",
    dark: "#48304F"
  },
  grey: {
    light: "#EAEAEB",
    medium_light: "#CBCBCD",
    medium: "#ABACAE",
    dark: "#2C2F35"
  },
  orange: { light: "#f19348", medium: "#ac6a31", dark: "#6d3f13" },
  yellow: { light: "#f4dc70", medium: "#ae9f51", dark: "#6c642f" },
  brown: { light: "#bf9963", medium: "#8d7248", dark: "#574527" },
  white: "#FFFFFF",
  black: "#2c2f35"
};

function getDefaultColor(code) {
  return colors[code].light;
}

export { colors, getDefaultColor };
