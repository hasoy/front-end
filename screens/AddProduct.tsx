import { StyleSheet, View } from "react-native";
import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Input, Title, Typography } from "../components";
import RadioButton from "../components/RadioButton";
import { LABELS } from "../constants/Labels";
import { useEffect, useState } from "react";
import { IReportReason } from "../types/schemas.types";
import { URLS } from "../constants/Host";
import PopUp from "../components/PopUp";
import { COLORS } from "../constants/Colors";
import IngredientInput from "../components/IngredientInput";

function AddProduct() {
  const { product } = useStore();
  const [productName, setProductName] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  interface INewProduct {
    barcode: string;
    productName?: string;
    ingredients: string[];
  }

  useEffect(() => {}, []);

  const sendProduct = () => {
    const newProduct: INewProduct = {
      barcode: product.current_barcode ?? "",
      productName,
      ingredients,
    };
    if (product.current_barcode) {
      fetch(`${URLS.HOST}${URLS.NEW_PRODUCT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newProduct }),
      })
        .then((response) => response.json())
        .then((data) => {
          setShowModal(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("no barcode");
    }
  };

  return (
    <Card padding scroll={false}>
      <Title label={product.current_barcode ?? ""} level="1" />
      <Card>
        <Input setState={setProductName} value={productName} label={LABELS.PRODUCT_NAAM} />
        <IngredientInput label={LABELS.VOEG_INGREDIENTEN_TOE} />
      </Card>
      <Button
        label={LABELS.PRODUCT_TOEVOEGEN}
        onPress={() => sendProduct()}
        style={styles.bottom}
      />
      {/* TODO add modal after adding product */}
      {/* {showModal && (
        <PopUp label="test" visible={showModal} onDismiss={() => setShowModal(false)} />
      )} */}
    </Card>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  ingredient: {
    padding: 4,
    backgroundColor: COLORS.GREEN,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default observer(AddProduct);
