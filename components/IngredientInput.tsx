import { StyleSheet, TextInput, View } from "react-native";
import { Typography } from "./Typography";
import Card from "./Card";
import { useRef, useState } from "react";
import Button from "./Button";

interface IInput {
  value?: string;
  placeholder?: string;
  label?: string;
}
export default function IngredientInput({ placeholder, label }: IInput) {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const handleInput = (text: string) => {
    setInputValue(text);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, inputValue]);
    setInputValue("");
  };
  const handleKeyDown = () => {
    addIngredient();
  };

  return (
    <Card scroll={false}>
      {label && <Typography label={label} style={styles.label} />}
      {/* TODO only add ingredients if it exists in backend to link to the product */}
      <TextInput
        style={styles.input}
        onChangeText={handleInput}
        value={inputValue}
        placeholder={placeholder}
        onSubmitEditing={handleKeyDown}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={false}
      />
      {ingredients.length > 0 && (
        <Card row={true} padding={false} scroll={false}>
          {ingredients.map((ingredient, i) => (
            <Button label={ingredient} shrink key={ingredient + i} />
          ))}
        </Card>
      )}
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
