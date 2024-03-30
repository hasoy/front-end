import { useNavigation } from "@react-navigation/native";
import { LABELS } from "../constants/Labels";
import Button from "./Button";
import { PATHS } from "../constants/paths";
import { ScanAgainButton } from "./ScanAgainButton";

export default function ScanAgainButtons() {
  const navigation = useNavigation();
  return (
    <>
      <ScanAgainButton />
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        type="secondary"
        onPress={() => {
          navigation.navigate(PATHS.ADD_PRODUCT as never);
        }}
      />
    </>
  );
}
