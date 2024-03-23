import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { useThemeColor } from "./Themed";

interface ICard {
  children: React.ReactNode;
  scroll?: boolean;
  row?: boolean;
  padding?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Card({
  children,
  scroll = true,
  row = false,
  padding = false,
  style,
}: ICard) {
  const backgroundColor = useThemeColor(
    { light: COLORS.LIGHT_BACKGROUND, dark: COLORS.BLACK },
    "background",
  );
  const view = (
    <View
      style={[
        styles.container,
        { backgroundColor },
        row && styles.row,
        padding && styles.padding,
        style && style,
      ]}
    >
      {children}
    </View>
  );

  const component = scroll ? (
    <ScrollView contentContainerStyle={styles.container}>{view}</ScrollView>
  ) : (
    <>{view}</>
  );
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
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
