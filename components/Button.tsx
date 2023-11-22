import { StyleSheet, Pressable, StyleProp, FlexStyle } from "react-native";
import { Typography } from "./Typography";
import { COLORS } from "../constants/Colors";

interface IButton {
  onPress?: () => void;
  label: string;
  type?: "primary" | "secondary" | "warning" | "doubtful";
  shrink?: boolean;
  style?: StyleProp<FlexStyle>;
  disabled?: boolean;
}

export default function Button({
  onPress,
  label,
  type = "primary",
  shrink = false,
  style,
  disabled = false,
}: IButton) {
  const getType = () => {
    if (type === "primary") return styles.primary;
    if (type === "secondary") return styles.secondary;
    if (type === "warning") return styles.warning;
    if (type === "doubtful") return styles.doubtful;
  };

  const getColor = () => {
    if (type === "primary") return "white";
    if (type === "secondary") return "green";
    if (type === "warning") return "white";
    if (type === "doubtful") return "white";
  };
  return (
    <Pressable
      disabled={disabled}
      style={[
        getType(),
        shrink && styles.shrink,
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
    >
      <Typography color={getColor()} label={label} alignText="center" weight="600"></Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    display: "flex",
  },
  disabled: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GRAY,
    pointerEvents: "none",
  },
  primary: {
    backgroundColor: COLORS.GREEN,
  },
  secondary: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.GREEN,
    borderWidth: 1,
  },
  shrink: {
    alignSelf: "flex-start",
  },
  warning: {
    backgroundColor: COLORS.LIGHT_RED,
    alignSelf: "flex-start",
    textTransform: "uppercase",
  },
  doubtful: {
    backgroundColor: COLORS.BLUE_2,
    textTransform: "capitalize",
    alignSelf: "flex-start",
  },
});
