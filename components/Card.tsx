import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { COLORS } from "../constants/Colors";

interface ICard {
  children: React.ReactNode;
  scroll?: boolean;
  row?: boolean;
}

export default function Card({ children, scroll = true, row = false }: ICard) {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const component = scroll ? (
    <ScrollView style={[styles.container, themeContainerStyle, row && styles.row]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, themeContainerStyle]}>{children}</View>
  );
  return <>{component}</>;
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: "flex",
    flex: 1,
    gap: 100,
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
  },
});
