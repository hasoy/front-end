import { FlexStyle, ScrollView, StyleProp, StyleSheet, View, useColorScheme } from "react-native";
import { COLORS } from "../constants/Colors";

interface ICard {
  children: React.ReactNode;
  scroll?: boolean;
  row?: boolean;
  padding?: boolean;
  style?: StyleProp<FlexStyle>;
}

export default function Card({
  children,
  scroll = true,
  row = false,
  padding = false,
  style,
}: ICard) {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const view = (
    <View
      style={[
        styles.container,
        themeContainerStyle,
        row && styles.row,
        padding && styles.padding,
        style && style,
      ]}
    >
      {children}
    </View>
  );

  const component = scroll ? <ScrollView style={styles.container}>{view}</ScrollView> : <>{view}</>;
  return <>{component}</>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 6,
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  lightContainer: {
    backgroundColor: COLORS.BACKGROUND,
  },
  darkContainer: {
    backgroundColor: COLORS.BLACK,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
