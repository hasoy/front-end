import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import LinkText from "../components/LinkText";
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
  const navigation = useNavigation();

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

  return (
    <Card padding>
      <Title label={product.current_scannedProduct.productName} />
      <Button
        label={
          haramIngredients.length > 0
            ? "Haram"
            : doubtfulIngredients.length > 0
            ? "Twijfel"
            : "Halal"
        }
        type={haramIngredients.length > 0 ? "warning" : "primary"}
        onPress={undefined}
        shrink={!haramIngredients.length}
      ></Button>
      {haramIngredients.length > 0 && (
        <>
          <Title label="Haram ingredients" level="3" />
          <Card scroll={false} row style={styles.marginBottom}>
            {haramIngredients.map((haramItem: IIngredient) => {
              return (
                <View key={uuid.v4().toString()} style={styles.ingredient}>
                  <LinkText ingredient={haramItem} />
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
                  <LinkText ingredient={doubtfulItem} color="red" />
                  <AntDesign name="warning" size={18} color="orange" />
                </View>
              );
            })}
          </Card>
        </>
      )}
      {product.current_scannedProduct.ingredients && (
        <>
          <Title label={LABELS.INGREDIENTEN} level="3" />
          <Typography label={product.current_scannedProduct.allIngredients ?? ""} />
        </>
      )}
      {/* {product.current_scannedProduct.explanation && (
            <View>
              <Title label={LABELS.TOELICHTING} level="3" />
              <RenderHtml source={source} contentWidth={width} />
            </View>
          )} */}
      <Button label={LABELS.PRODUCT_FOUT_MELDEN} onPress={reportProduct} style={styles.bottom} />
    </Card>
  );
}

const styles = StyleSheet.create({
  ingredient: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 6,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 8,
  },
  bottom: {
    justifyContent: "flex-end",
  },
});

export default observer(TabProductDetails);
