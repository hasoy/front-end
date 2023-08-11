import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Button from "../components/Button";
import LinkText from "../components/LinkText";
import Row from "../components/Row";
import { IIngredient } from "../../front-end/types/schemas.types";
import { Title } from "../components/Title";
import Card from "../components/Card";
import { Typography } from "../components/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import RenderHtml from "react-native-render-html";
import { LABELS } from "../constants/Labels";
import { useNavigation } from "@react-navigation/native";

function TabProductDetails() {
  const { product } = useStore();
  const source = { html: `${product.current_scannedProduct?.explanation}` };
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  fetch(
    "https://lionfish-app-54sxn.ondigitalocean.app/api/products?filters[barcode][$contains]=8000500179864&populate=*"
  ).then((res) => res.json().then((data) => console.log(data)));

  if (product.current_scannedProduct === null)
    return (
      <View>
        <Typography label="No scanned product" />
      </View>
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

  return (
    <Card>
      {product.current_scannedProduct && (
        <>
          <Title label={product.current_scannedProduct.productName} />
          <Button
            label={haramIngredients.length > 0 ? "haram" : "halal"}
            type={haramIngredients.length > 0 ? "warning" : "primary"}
            onPress={undefined}
          ></Button>
          {haramIngredients.length > 0 && (
            <>
              <Title label="Haram ingredients" level="3" />
              {haramIngredients.map((haramItem: IIngredient) => {
                return (
                  <View key={uuid.v4().toString()} style={[styles.ingredient]}>
                    <LinkText ingredient={haramItem} />
                    <AntDesign name="exclamationcircle" size={18} color="red" />
                  </View>
                );
              })}
            </>
          )}
          {doubtfulIngredients.length > 0 && (
            <>
              <Title label={LABELS.TWIJFELACHTIGE_INGREDIENTEN} level="3" />
              <View key={uuid.v4().toString()} style={[styles.ingredient]}>
                {doubtfulIngredients.map((doubtfulItem: IIngredient) => {
                  return (
                    <Row>
                      <LinkText ingredient={doubtfulItem} color="red" />
                      <AntDesign name="warning" size={18} color="orange" />
                    </Row>
                  );
                })}
              </View>
            </>
          )}
          {product.current_scannedProduct.ingredients && (
            <View>
              <Title label={LABELS.INGREDIENTEN} level="3" />
              <Typography label={product.current_scannedProduct.allIngredients ?? ""} />
            </View>
          )}
          {product.current_scannedProduct.explanation && (
            <View>
              <Title label={LABELS.TOELICHTING} level="3" />
              <RenderHtml source={source} contentWidth={width} />
            </View>
          )}
          {product.current_scannedProduct.barcode && (
            <Button label={LABELS.PRODUCT_FOUT_MELDEN} onPress={reportProduct} />
          )}
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  ingredient: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 8,
  },
});

export default observer(TabProductDetails);
