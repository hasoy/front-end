import { StyleSheet } from "react-native";
import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Title } from "../components";
import { LABELS } from "../constants/Labels";
import { useState } from "react";
import URLS from "../constants/Host";
import PopUp from "../components/PopUp";
import IngredientInput from "../components/IngredientInput";
import OcrImage from "../components/OcrImage";
import { useFetch } from "../hooks/useFetch";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { temporaryStatus } from "../helpers/checkStatus";

function AddProduct() {
  const { product, user } = useStore();

  const { Fetch } = useFetch();
  const [productName, setProductName] = useState("");
  const [popupLabel, setPopupLabel] = useState("");
  const [ingredients, setIngredients] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  interface INewProduct {
    barcode: string;
    productName?: string;
    ingredients: string;
    addedBy?: number;
  }
  const sendProduct = async () => {
    const newProduct: INewProduct = {
      barcode: product.current_barcode,
      productName,
      ingredients: ingredients.split(/\n|;|:|,|;/gm).join(", "),
      // addedBy: user.current_user.id,
    };
    if (product.current_barcode) {
      const response = await Fetch({
        url: `${URLS.HOST}${URLS.NEW_PRODUCT}`,
        method: "POST",
        body: { data: newProduct },
      });
      if (response.error) {
        setShowModal(true);
        setPopupLabel(
          response.error?.message == "This attribute must be unique"
            ? LABELS.PRODUCT_BESTAAT_AL
            : response.error.message
        );
        return;
      }
      setShowModal(true);
      const status = await temporaryStatus(ingredients);
      const haramIngredients = status
        .map((ingredient) => ingredient?.current_ingredient)
        .filter((e) => e != undefined);
      const haramLabel = `${
        LABELS.NEW_PRODUCT_ADDED_SUCCESS
      } \nProduct is waarschijnlijk haram door de volgende ingredienten: ${haramIngredients.join(
        ", "
      )}.`;
      const halalLabel = `${LABELS.NEW_PRODUCT_ADDED_SUCCESS} \nGeen haram ingredienten gedetecteerd. Product is waarschijnlijk halal.`;
      const label = haramIngredients.length ? haramLabel : halalLabel;
      setPopupLabel(label);
    } else {
      setShowModal(true);
      setPopupLabel("Geen barcode");
    }
  };

  return (
    <Card padding scroll={false}>
      <Title label={LABELS.BARCODE} level="1" />
      <Title label={product.current_barcode ?? LABELS.GEEN_BARCODE_GEVONDEN} level="2" />
      <Card>
        <TextInput
          onChangeText={(e) => setProductName(e)}
          value={productName}
          label={LABELS.PRODUCT_NAAM}
          mode="outlined"
        />
        <IngredientInput
          label={LABELS.VOEG_INGREDIENTEN_TOE}
          setIngredients={setIngredients}
          value={ingredients}
          placeholder={LABELS.EEN_INGREDIENT_PER_REGEL}
        />
        <OcrImage setValue={setIngredients} />
      </Card>
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        onPress={() => sendProduct()}
        style={styles.bottom}
        disabled={!productName}
      />
      {showModal && (
        <PopUp
          title={popupLabel}
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
            // TODO handle when added product
            navigation.navigate("scanner" as never);
          }}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
});

export default observer(AddProduct);
