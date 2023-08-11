import { StyleSheet, TextInput } from "react-native";
import { Typography } from "./Typography";

interface IInput {
  setState: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder?: string;
  label?: string;
}
export default function Input({ placeholder, setState, value, label }: IInput) {
  const handleInput = (text: string) => {
    setState(text);
  };

  return (
    <>
      {label && <Typography label={label} style={styles.label} />}
      <TextInput
        style={styles.input}
        onChangeText={handleInput}
        value={value}
        placeholder={placeholder}
      />
    </>
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
    display: "flex",
    flex: 1,
  },
  label: {
    marginBottom: 6,
  },
});
