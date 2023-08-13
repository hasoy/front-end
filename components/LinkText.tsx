import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { ITextColor, Typography } from "./Typography";
import { IIngredient } from "../types/schemas.types";

interface ILinkText {
  label: string;
  to: string;
  color?: ITextColor;
  onPress?: () => void;
}

export default function LinkText({ label, color = "red", to, onPress }: ILinkText) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        onPress();
        navigation.navigate(to);
      }}
    >
      <Typography style={[styles.link]} color={color} label={label} weight="600" />
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
