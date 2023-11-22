import { StyleSheet } from "react-native";
import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Input, Title } from "../components";
import { LABELS } from "../constants/Labels";
import { useEffect, useState } from "react";
import { URLS } from "../constants/Host";
import PopUp from "../components/PopUp";
import IngredientInput from "../components/IngredientInput";
import OcrImage from "../components/OcrImage";

function AddProduct() {
  const { product, user } = useStore();
  const [productName, setProductName] = useState("");
  const [popupLabel, setPopupLabel] = useState("");
  const [ingredients, setIngredients] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [launchCamera, setLaunchCamera] = useState(false);

  interface INewProduct {
    barcode: string;
    productName?: string;
    ingredients: string;
    addedBy?: number;
  }

  useEffect(() => {}, []);

  const sendProduct = async () => {
    const newProduct: INewProduct = {
      barcode: product.current_barcode,
      productName,
      ingredients: ingredients.split("\n").join(", "),
      // addedBy: user.current_user.id,
    };
    if (product.current_barcode) {
      try {
        const response = await fetch(`${URLS.HOST}${URLS.NEW_PRODUCT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newProduct }),
        });
        const data = await response.json();
        if (data.data.attributes.barcode) {
          setShowModal(true);
          setPopupLabel(LABELS.NEW_PRODUCT_ADDED_SUCCESS);
        }
      } catch {
        (error) => {
          console.error(error);
          setShowModal(true);
          setPopupLabel("Something went wrong");
        };
      }
    } else {
      setShowModal(true);
      setPopupLabel("No barcode");
    }
  };

  return (
    <Card padding scroll={false}>
      <Title label={LABELS.BARCODE} level="1" />
      <Title label={product.current_barcode ?? LABELS.GEEN_BARCODE_GEVONDEN} level="2" />
      <Card>
        <Input
          onChangeText={(e) => setProductName(e)}
          value={productName}
          label={LABELS.PRODUCT_NAAM}
        />
        <IngredientInput
          label={LABELS.VOEG_INGREDIENTEN_TOE}
          setIngredients={setIngredients}
          value={ingredients}
        />
      </Card>
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        onPress={() => sendProduct()}
        style={styles.bottom}
        disabled={!productName}
      />
      <Button
        label={LABELS.MAAK_FOTO_VAN_INGREDIENTEN}
        onPress={() => setLaunchCamera(true)}
      ></Button>
      {/* TODO add modal after adding product */}
      {showModal && (
        <PopUp
          title={popupLabel}
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
        />
      )}
      {launchCamera && <OcrImage />}
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
