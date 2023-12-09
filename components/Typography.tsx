import { COLORS } from "../constants/Colors";
import { Text } from "./Themed";
import { StyleProp, StyleSheet, ViewStyle, useColorScheme } from "react-native";

export type ITextColor = keyof typeof COLORS;

interface ITypography {
  color?: ITextColor;
  weight?: "400" | "500" | "600";
  label: string;
  style?: StyleProp<ViewStyle>;
  textAlign?: "center" | "left" | "right";
}

export function Typography({ color, weight = "400", label, textAlign, style }: ITypography) {
  const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const colorScheme = useColorScheme();
  color = color ? color : colorScheme === "dark" ? "LIGHT_BACKGROUND" : "BLACK";

  const getWeight = () => {
    if (weight === "400") return styles.default;
    if (weight === "500") return styles.bold;
    if (weight === "600") return styles.extraBold;
  };

  return (
    <Text
      style={[
        styles.text,
        color && { color: COLORS[color] },
        getWeight(),
        textAlign && { textAlign },
        style,
      ]}
    >
      {Capitalize(label)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#454545",
  },
  default: {
    fontWeight: "400",
  },
  bold: {
    fontWeight: "500",
    fontFamily: "RobotoBold",
  },
  extraBold: {
    fontWeight: "600",
    fontFamily: "RobotoBold",
  },
});
