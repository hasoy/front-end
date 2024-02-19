import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { underlineText } from "../helpers/underlineText";
import { LABELS } from "../constants/Labels";
import Accordion from "./Accordion";
import { Text } from "react-native-paper";
import { Title } from "./Title";

function AllIngredients() {
  const { product, user } = useStore();
  const { allIngredients } = product.current_scannedProduct;
  const detectWords = [user.current_user.allergies, user.current_user.customAllergies].flat();
  const { underlinedJsx, detectedWords } = underlineText(
    detectWords ?? [],
    allIngredients?.toLowerCase()
  );
  return (
    <>
      {detectWords.length > 0 && (
        <>
          <Title label="Detected words" level="3" />
          <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
            {detectedWords.join(", ").trim()}
          </Text>
        </>
      )}
      {product.current_scannedProduct?.allIngredients && (
        <Accordion title={LABELS.ALLE_INGREDIENTEN}>{underlinedJsx}</Accordion>
      )}
    </>
  );
}

export default observer(AllIngredients);
