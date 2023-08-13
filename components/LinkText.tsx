import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { ITextColor, Typography } from "./Typography";
import { IIngredient } from "../types/schemas.types";
import { useStore } from "../hooks/useStore";

interface ILinkText {
  ingredient: IIngredient;
  to;
  color?: ITextColor;
}

export default function LinkText({ ingredient, color = "red" }: ILinkText) {
  const navigation = useNavigation();
  const { product } = useStore();
  return (
    <Pressable
      onPress={() => {
        product.setSelectedIngredient(ingredient);
        navigation.navigate("TabIngredient");
      }}
    >
      <Typography style={[styles.link]} color={color} label={ingredient.attributes.name} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    fontSize: 14,
    paddingRight: 5,
  },
});
