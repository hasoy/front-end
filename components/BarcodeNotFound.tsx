import { LABELS } from "../constants/Labels";
import Card from "./Card";
import { Title } from "./Title";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import ScanAgainButtons from "./ScanAgainButtons";

function BarcodeNotFound() {
  const { product } = useStore();
  return (
    <Card scroll={false} padding>
      <Title
        level="2"
        label={`${LABELS.BARCODE}: ${
          product?.current_barcode
        } ${LABELS.NIET_GEVONDEN.toLowerCase()}`}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/scan.png")}
        contentFit="contain"
      />
      <ScanAgainButtons />
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
