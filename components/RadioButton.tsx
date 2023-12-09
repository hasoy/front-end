import { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { View, Pressable } from "react-native";
import { Typography } from "./Typography";
import uuid from "react-native-uuid";

interface IRadioOption {
  label: string;
  value: string;
}

interface IRadioButton {
  data: IRadioOption[];
  onSelect: (value: string) => void;
}
export default function RadioButton({ data, onSelect }: IRadioButton) {
  const [userOption, setUserOption] = useState("");
  const colorScheme = useColorScheme();

  const selectHandler = (value: string) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            style={[styles.button, item.value === userOption && styles.selected]}
            onPress={() => selectHandler(item.value)}
            key={uuid.v4().toString()}
          >
            <Typography
              label={item.label}
              color={
                colorScheme === "dark"
                  ? "LIGHT_BACKGROUND"
                  : item.value === userOption
                  ? "LIGHT_BACKGROUND"
                  : "BLACK"
              }
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  selected: {
    backgroundColor: "#049C82",
  },
});
