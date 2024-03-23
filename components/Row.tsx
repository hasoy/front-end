import { StyleSheet } from "react-native";
import { View } from "../components/Themed";

export default function Row(props: {
  children: React.ReactNode;
  // TODO: update typing for classname
  className?: React.CSSProperties;
}) {
  return (
    <View style={{ ...styles.container, ...props.className }}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
