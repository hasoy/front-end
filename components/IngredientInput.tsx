import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface IIngredientInput {
  value?: string;
  placeholder?: string;
  label?: string;
  setIngredients?: React.Dispatch<React.SetStateAction<string>>;
}
export default function IngredientInput({
  placeholder,
  label,
  value,
  setIngredients,
}: IIngredientInput) {
  const handleInput = (text: string) => {
    setIngredients(text);
  };

  return (
    <TextInput
      style={styles.input}
      label={label}
      onChangeText={handleInput}
      value={value}
      placeholder={placeholder}
      keyboardType="default"
      returnKeyType="next"
      blurOnSubmit={false}
      multiline
      mode="outlined"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
  },
});
