import { Title } from "react-native-paper";
import { View } from "../components";
import { ScanAgainButton } from "../components/ScanAgainButton";
import { SearchInput } from "./SearchInput";
import { StyleSheet } from "react-native";
import { useStore } from "../hooks/useStore";
import { useEffect } from "react";

export const HomeScreen = () => {
  const { user } = useStore();

  const fetchUser = async () => {
    await user.checkLoggedIn();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Title style={styles.title}>Sheikh Halal</Title>
        <SearchInput />
      </View>
      <ScanAgainButton buttonLabel="Barcode Scannen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
