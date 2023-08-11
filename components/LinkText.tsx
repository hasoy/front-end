import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ITextColor, Typography } from "./Typography";
import { IIngredient } from "../types/schemas.types";
import { useStore } from "../hooks/useStore";

interface ILinkText {
  ingredient: IIngredient;
  color?: ITextColor;
}

export default function LinkText({ ingredient, color = "red" }: ILinkText) {
  const navigation = useNavigation();
  const { product } = useStore();
  return (
    <TouchableOpacity
      onPress={() => {
        // TODO add ingredient to data context
        product.set("selectedIngredient", ingredient);
        navigation.navigate("TabIngredient");
      }}
    >
      <Typography style={[styles.link]} color={color} label={ingredient.attributes.name} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    fontSize: 14,
    paddingRight: 5,
  },
});
