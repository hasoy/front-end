import { COLORS } from "../constants/Colors";
import { Text } from "./Themed";
import { StyleProp, StyleSheet, ViewStyle, useColorScheme } from "react-native";

export type ITextColor = "white" | "black" | "red" | "blue" | "green";

interface ITypography {
  color?: ITextColor;
  weight?: "400" | "500" | "600" | "700";
  label: string;
  style?: StyleProp<ViewStyle>;
  alignText?: "center" | "start" | "end";
}

export function Typography({ color, weight = "400", label, alignText, style }: ITypography) {
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === "light" ? styles.black : styles.white;
  const getColor = () => {
    if (color === "black") return styles.black;
    if (color === "white") return styles.white;
    if (color === "red") return styles.red;
    if (color === "blue") return styles.blue;
    if (color === "green") return styles.green;
  };

  const getWeight = () => {
    if (weight === "400") return styles.default;
    if (weight === "500") return styles.bold;
    if (weight === "600") return styles.extraBold;
  };

  const getPlacement = () => {
    if (alignText === "center") return styles.center;
    if (alignText === "end") return styles.end;
    if (alignText === "start") return styles.start;
  };
  return (
    <Text
      style={[
        styles.text,
        color ? getColor() : themeContainerStyle,
        getWeight(),
        getPlacement(),
        style,
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#454545",
  },
  white: {
    color: "white",
  },
  black: {
    color: "black",
  },
  red: {
    color: "red",
  },
  blue: {
    color: "blue",
  },
  green: {
    color: COLORS.GREEN,
  },
  default: {
    fontWeight: "400",
  },
  bold: {
    fontWeight: "500",
  },
  extraBold: {
    fontWeight: "600",
  },
  center: {
    textAlign: "center",
  },
  end: {
    textAlign: "right",
  },
  start: {
    textAlign: "left",
  },
});
