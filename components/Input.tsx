import { FlexStyle, StyleProp, StyleSheet, TextInput } from "react-native";
import { Typography } from "./Typography";
import Card from "./Card";
import { useState } from "react";

interface IInput {
  setState: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder?: string;
  label?: string;
  style?: StyleProp<FlexStyle>;
  containerStyle?: StyleProp<FlexStyle>;
}
export default function Input({
  placeholder,
  setState,
  value,
  label,
  style,
  containerStyle,
}: IInput) {
  const handleInput = (text: string) => {
    setState(text);
  };

  const [focused, setFocused] = useState(false);

  return (
    <Card scroll={false} style={containerStyle}>
      {label && <Typography label={label} style={styles.label} />}
      <TextInput
        style={[styles.input, style]}
        onChangeText={handleInput}
        value={value}
        placeholder={placeholder}
        multiline
        blurOnSubmit
        maxLength={200}
        returnKeyType="done"
        scrollEnabled={false}
      />
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
