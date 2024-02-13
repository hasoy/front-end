import { useNavigation } from "@react-navigation/native";
import { LABELS } from "../constants/Labels";
import { PATHS } from "../constants/paths";
import { useStore } from "../hooks/useStore";
import Button from "./Button";

export const ScanAgainButton = () => {
  const { product } = useStore();
  const navigation = useNavigation();
  return (
    <Button
      label={LABELS.OPNIEUW_SCANNEN}
      onPress={() => {
        product.setScanned(false);
        product.setScannedProduct(null);
        navigation.navigate(PATHS.SCANNER as never);
      }}
    />
  );
};
