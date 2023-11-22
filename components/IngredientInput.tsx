import { StyleSheet } from "react-native";
import { Typography } from "./Typography";
import Card from "./Card";
import Input from "./Input";

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
    <Card scroll={false}>
      {label && <Typography label={label} style={styles.label} />}
      <Input
        style={styles.input}
        onChangeText={handleInput}
        value={value}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="next"
        blurOnSubmit={false}
        multiline
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
  },
  label: {
    marginBottom: 6,
  },
});
