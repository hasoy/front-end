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
  DARK_GRAY: "#222222",
  BLACK: "#151515",
  GRAY: "#A9A9A9",
  LIGHT_GRAY: "#DFDFDF",
  LIGHT_BACKGROUND: "#F7FAFB",
  ORANGE: "#FFA500",
};

export default {
  light: {
    text: COLORS.BLACK,
    background: COLORS.LIGHT_BACKGROUND,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: COLORS.LIGHT_BACKGROUND,
    background: COLORS.BLACK,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
