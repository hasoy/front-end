import { FlexStyle, StyleProp, StyleSheet, TextInput, useColorScheme } from "react-native";
import { Typography } from "./Typography";
import Card from "./Card";
import { COLORS } from "../constants/Colors";

interface IInput extends React.ComponentProps<typeof TextInput> {
  label?: string;
  style?: StyleProp<FlexStyle>;
  containerStyle?: StyleProp<FlexStyle>;
}
export default function Input({ label, style, containerStyle, ...props }: IInput) {
  const colorScheme = useColorScheme();
  const color = colorScheme === "light" ? COLORS.BLACK : COLORS.LIGHT_BACKGROUND;

  return (
    <Card scroll={false} style={containerStyle}>
      {label && <Typography label={label} style={styles.label} />}
      <TextInput style={[styles.input, style, { color }]} placeholderTextColor={color} {...props} />
    </Card>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 16,
    verticalAlign: "top",
  },
  label: {
    marginBottom: 6,
  },
});
