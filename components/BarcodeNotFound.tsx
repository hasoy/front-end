import { LABELS } from "../constants/Labels";
import { PATHS } from "../constants/paths";
import Card from "./Card";
import { Title } from "./Title";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useStore } from "../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { observer } from "mobx-react-lite";

function BarcodeNotFound() {
  const { product } = useStore();
  const navigation = useNavigation();
  return (
    <Card scroll={false} padding>
      <Title
        level="2"
        label={`${LABELS.BARCODE}:${product.current_barcode} ${LABELS.NIET_GEVONDEN.toLowerCase()}`}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/scan.png")}
        contentFit="contain"
      />
      <Button
        label={LABELS.OPNIEUW_SCANNEN}
        onPress={() => {
          navigation.navigate(PATHS.SCANNER as never);
        }}
      />
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        onPress={() => {
          navigation.navigate(PATHS.ADD_PRODUCT as never);
        }}
        type="secondary"
      />
    </Card>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
});

export default observer(BarcodeNotFound);
