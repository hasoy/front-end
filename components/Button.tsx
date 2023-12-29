import { StyleSheet, Pressable, StyleProp, FlexStyle, useColorScheme } from "react-native";
import { COLORS } from "../constants/Colors";
import { useState } from "react";
import { PopUp, Typography } from "./";

interface IButton {
  onPress?: () => void;
  label: string;
  type?: "primary" | "secondary" | "warning" | "doubtful";
  shrink?: boolean;
  style?: StyleProp<FlexStyle>;
  disabled?: boolean;
  warnBeforeAction?: boolean;
  warnBeforeActionMessage?: string;
  warnBeforeActionTitle?: string;
}

export default function Button({
  onPress,
  label,
  type = "primary",
  shrink = false,
  style,
  disabled = false,
  warnBeforeAction = false,
  warnBeforeActionMessage,
  warnBeforeActionTitle,
}: IButton) {
  const colorScheme = useColorScheme();
  const [showModal, setShowModal] = useState(false);
  const getColor = () => {
    if (type === "secondary" && colorScheme === "light") return "GREEN";
    if (type === "secondary" && colorScheme === "dark") return "LIGHT_BACKGROUND";
    if (type === "primary" || "warning") return "LIGHT_BACKGROUND";
    if (type === "doubtful") return "ORANGE";
  };

  const handlePress = () => {
    if (warnBeforeAction) {
      setShowModal(true);
      return;
    }
    onPress();
  };

  return (
    <>
      {showModal ? (
        <PopUp
          title={warnBeforeActionTitle}
          message={warnBeforeActionMessage}
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
          onButtonPress={() => onPress()}
          buttonLabel={warnBeforeActionTitle}
        />
      ) : (
        <Pressable
          disabled={disabled}
          style={[
            styles[`${type}${colorScheme}`],
            shrink && styles.shrink,
            styles.button,
            disabled && styles.disabled,
            style,
          ]}
          onPress={handlePress}
        >
          <Typography color={getColor()} label={label} textAlign="center" weight="600"></Typography>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.GRAY,
    pointerEvents: "none",
  },
  primarylight: {
    backgroundColor: COLORS.GREEN,
  },
  primarydark: {
    backgroundColor: COLORS.GREEN,
  },
  secondarylight: {
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    borderColor: COLORS.GREEN,
    borderWidth: 1,
  },
  secondarydark: {
    backgroundColor: COLORS.DARK_GRAY,
    borderColor: COLORS.LIGHT_BACKGROUND,
    borderWidth: 1,
  },
  shrink: {
    alignSelf: "flex-start",
  },
  warningdark: {
    backgroundColor: COLORS.LIGHT_RED,
    textTransform: "uppercase",
  },
  warninglight: {
    backgroundColor: COLORS.LIGHT_RED,
    textTransform: "uppercase",
  },
  doubtfullight: {
    backgroundColor: COLORS.ORANGE,
    textTransform: "capitalize",
    alignSelf: "flex-start",
  },
  doubtfuldark: {
    backgroundColor: COLORS.ORANGE,
    textTransform: "capitalize",
    alignSelf: "flex-start",
  },
});
