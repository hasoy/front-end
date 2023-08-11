import { StyleSheet, Pressable } from "react-native";
import { Typography } from "./Typography";
import { COLORS } from "../constants/Colors";

interface IButton {
  onPress?: () => void;
  label: string;
  type?: "primary" | "warning";
}

export default function Button({ onPress, label, type = "primary" }: IButton) {
  return (
    <Pressable style={[type === "primary" ? styles.primary : styles.warning]} onPress={onPress}>
      <Typography
        color="white"
        label={type === "warning" ? label.toUpperCase() : label}
        alignText="center"
        weight="600"
      ></Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: COLORS.GREEN,
    display: "flex",
  },
  warning: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.LIGHT_RED,
    display: "flex",
    alignSelf: "flex-start",
  },
});
