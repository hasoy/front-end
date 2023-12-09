import { StyleSheet, useColorScheme } from "react-native";
import { ITextColor, Typography } from "./Typography";

interface ITitle {
  label: string;
  level?: "1" | "2" | "3" | "4";
  color?: ITextColor;
}
export function Title({ label, level = "1", color }: ITitle) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === "light" ? "BLACK" : "LIGHT_BACKGROUND";

  const getFontSize = () => {
    if (level === "1") return styles.levelOne;
    if (level === "2") return styles.levelTwo;
    if (level === "3") return styles.levelThree;
  };
  return <Typography label={label} color={color ?? themeContainerStyle} style={getFontSize()} />;
}

const styles = StyleSheet.create({
  levelOne: {
    fontSize: 34,
    marginVertical: 8,
    fontFamily: "RobotoBold",
  },
  levelTwo: {
    fontSize: 28,
    marginVertical: 6,
    fontFamily: "RobotoBold",
    fontWeight: "600",
  },
  levelThree: {
    fontSize: 22,
    marginVertical: 4,
    fontFamily: "RobotoBold",
  },
});
