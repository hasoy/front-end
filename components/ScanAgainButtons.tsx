import { useNavigation } from "@react-navigation/native";
import { LABELS } from "../constants/Labels";
import Button from "./Button";
import { PATHS } from "../constants/paths";
import { useStore } from "../hooks/useStore";

export default function ScanAgainButtons() {
  const navigation = useNavigation();
  const { product } = useStore();
  return (
    <>
      <Button
        label={LABELS.OPNIEUW_SCANNEN}
        onPress={() => {
          product.setScanned(false);
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
    </>
  );
}
