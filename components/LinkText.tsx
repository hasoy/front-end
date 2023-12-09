import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { ITextColor, Typography } from "./Typography";

interface ILinkText {
  label: string;
  to?: string;
  color?: ITextColor;
  onPress?: () => void;
}

export default function LinkText({ label, color = "LIGHT_RED", to, onPress }: ILinkText) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        if (onPress) onPress();
        if (to) navigation.navigate(to as never);
      }}
    >
      <Typography style={[styles.link]} color={color} label={label} weight="600" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    fontSize: 16,
    paddingRight: 5,
  },
});
