const tintColorLight = "#0393B5";
const tintColorDark = "#fff";

export const COLORS = {
  TEXT_GRAY: "#454545",
  LIGHT_RED: "#F93E3E",
  GREEN: "#179E8E",
  GREEN_2: "#2AC09D",
  GREEN_3: "#2BE9BC",
  BLUE: "#0393B5",
  BLUE_2: "#0393B5",
  BLUE_3: "#29D3EB",
  BLUE_4: "#E0FBFF",
  BLACK: "#151515",
  GRAY: "#A9A9A9",
  LIGHT_GRAY: "#DFDFDF",
  BACKGROUND: "#F7FAFB",
};

export default {
  light: {
    text: "#000",
    background: COLORS.BACKGROUND,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
