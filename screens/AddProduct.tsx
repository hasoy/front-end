import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Title } from "../components";
import { LABELS } from "../constants/Labels";
import { useState } from "react";
import URLS from "../constants/Host";
import PopUp from "../components/PopUp";
import IngredientInput from "../components/IngredientInput";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { temporaryStatus } from "../helpers/checkStatus";

function AddProduct() {
  const { product } = useStore();
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
    if (!product.current_barcode) {
      setShowModal(true);
      setPopupLabel("Geen barcode");
      return;
    }
    const newProduct: INewProduct = {
      barcode: product.current_barcode,
      productName,
      ingredients: ingredients.split(/\n|;|:|,|;/gm).join(", "),
      // addedBy: user.current_user.id,
    };

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(newProduct));

    const request = await fetch(`${URLS.HOST}${URLS.NEW_PRODUCT}`, {
      method: "post",
      body: formdata,
    });
    const response = await request.json();
    if (response.error) {
      setShowModal(true);
      setPopupLabel(
        // TODO: improve error messages
        response.error?.message == "This attribute must be unique"
          ? LABELS.PRODUCT_BESTAAT_AL
          : response.error.message,
      );
      return;
    }
    const status = await temporaryStatus(ingredients);
    const haramIngredients = status
      .map((ingredient) => {
        if (ingredient?.halal) return;
        return ingredient?.current_ingredient;
      })
      .filter((e) => e != undefined);
    const haramLabel = `${
      LABELS.NEW_PRODUCT_ADDED_SUCCESS
    } \nProduct is waarschijnlijk haram door de volgende ingredienten: ${haramIngredients.join(
      ", ",
    )}.`;
    const halalLabel = `${LABELS.NEW_PRODUCT_ADDED_SUCCESS} \nGeen haram ingredienten gedetecteerd. Product is waarschijnlijk halal.`;
    const label = haramIngredients.length ? haramLabel : halalLabel;
    setShowModal(true);
    setPopupLabel(label);
  };

  return (
    <Card padding>
      <>
        <Title label={LABELS.BARCODE} level="1" />
        <Title
          label={product.current_barcode ?? LABELS.GEEN_BARCODE_GEVONDEN}
          level="2"
        />
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
            placeholder={LABELS.VOER_INGREDIENTEN_IN}
          />
        </Card>
      </>
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        onPress={() => sendProduct()}
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

export default observer(AddProduct);
