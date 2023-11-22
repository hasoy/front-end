import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Button from "../components/Button";
import LinkText from "../components/LinkText";
import { IIngredient } from "../../front-end/types/schemas.types";
import { Title } from "../components/Title";
import Card from "../components/Card";
import { Typography } from "../components/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { useNavigation } from "@react-navigation/native";
import Accordion from "../components/Accordion";
import { useEffect, useState } from "react";
import { PopUp } from "../components";

function TabProductDetails() {
  const { product } = useStore();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  if (product.current_scannedProduct === null)
    return (
      <Card padding>
        <Typography label="No scanned product" />
      </Card>
    );
  const haramIngredients: IIngredient[] = product.current_scannedProduct?.ingredients?.data.filter(
    (ingredient: IIngredient) => ingredient.attributes.status === "haram"
  );
  const doubtfulIngredients: IIngredient[] =
    product.current_scannedProduct?.ingredients?.data.filter(
      (ingredient: IIngredient) => ingredient.attributes.status === "doubtful"
    );
  const reportProduct = () => {
    navigation.navigate("ReportProduct");
  };

  useEffect(() => {
    return () => {
      setShowModal(false);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card padding>
        <Title label={product.current_scannedProduct?.productName} />
        <Button
          label={
            haramIngredients.length > 0
              ? LABELS.HARAM
              : doubtfulIngredients.length > 0
              ? LABELS.TWIJFELACHTIG
              : LABELS.HALAL
          }
          type={haramIngredients.length > 0 ? "warning" : "primary"}
          onPress={undefined}
          shrink={!haramIngredients.length}
        ></Button>
        {haramIngredients.length > 0 && (
          <>
            <Title label={LABELS.HARAM_INGREDIENTEN} level="3" />
            <Card scroll={false} row style={styles.marginBottom}>
              {haramIngredients.map((haramItem: IIngredient) => {
                return (
                  <View key={uuid.v4().toString()} style={styles.ingredient}>
                    <LinkText
                      label={haramItem.attributes.name}
                      // to="TabIngredient"
                      onPress={() => {
                        product.setSelectedIngredient(haramItem);
                        setShowModal(true);
                      }}
                    />
                    <AntDesign name="exclamationcircle" size={18} color="red" />
                  </View>
                );
              })}
            </Card>
          </>
        )}
        {doubtfulIngredients.length > 0 && (
          <>
            <Title label={LABELS.TWIJFELACHTIGE_INGREDIENTEN} level="3" />
            <Card scroll={false} row>
              {doubtfulIngredients.map((doubtfulItem: IIngredient) => {
                return (
                  <View key={uuid.v4().toString()} style={styles.ingredient}>
                    <LinkText
                      label={doubtfulItem.attributes.name}
                      // to="TabIngredient"
                      onPress={() => {
                        product.setSelectedIngredient(doubtfulItem);
                        setShowModal(true);
                      }}
                      color="red"
                    />
                    <AntDesign name="warning" size={18} color="orange" />
                  </View>
                );
              })}
            </Card>
          </>
        )}
        {product.current_scannedProduct?.ingredients && (
          <Accordion title={LABELS.INGREDIENTEN}>
            <Typography label={product.current_scannedProduct?.allIngredients ?? ""} />
          </Accordion>
        )}
        {showModal && (
          <PopUp
            title={product.current_selectedIngredient.attributes.name}
            message={product.current_selectedIngredient.attributes.explanation}
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </Card>
      <View style={styles.footer}>
        <Button label={LABELS.PRODUCT_FOUT_MELDEN} onPress={reportProduct} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ingredient: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 8,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 8,
  },
  footer: {
    justifyContent: "flex-end",
    margin: 16,
  },
});

export default observer(TabProductDetails);
