import { observer } from "mobx-react-lite";
import uuid from "react-native-uuid";
import { StyleSheet } from "react-native";
import { useStore } from "../hooks/useStore";
import { Card, LinkText, Title, View } from ".";
import { LABELS } from "../constants";

interface IIngredientListView {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function IngredientListView({ setShowModal }: IIngredientListView) {
  const { product } = useStore();

  const { allIngredients, productName } = product.current_scannedProduct;
  const { haram_ingredients_list, doubtful_ingredients_list, has_alcohol } =
    product;

  const halalRegex = /h[ea]laa?l/i;
  const containsHalalWord =
    halalRegex.test(allIngredients) || halalRegex.test(productName);

  return (
    <>
      {haram_ingredients_list?.length > 0 &&
        (has_alcohol || !product.current_scannedProduct.vegan) &&
        !containsHalalWord && (
          <>
            <Title label={LABELS.HARAM_INGREDIENTEN} level="3" />
            <Card row>
              {haram_ingredients_list?.map((haramItem) => {
                return (
                  <View key={uuid.v4().toString()} style={styles.ingredient}>
                    <LinkText
                      label={haramItem.title}
                      onPress={() => {
                        product.setSelectedIngredient(haramItem);
                        setShowModal(true);
                      }}
                    />
                  </View>
                );
              })}
            </Card>
          </>
        )}
      {doubtful_ingredients_list.length > 0 &&
        !product.current_scannedProduct.vegan &&
        !containsHalalWord && (
          <>
            <Title label={LABELS.TWIJFELACHTIGE_INGREDIENTEN} level="3" />
            <Card scroll={false} row>
              {doubtful_ingredients_list.map((doubtfulItem) => {
                return (
                  <View key={uuid.v4().toString()} style={styles.ingredient}>
                    <LinkText
                      label={doubtfulItem.ingredientName}
                      onPress={() => {
                        product.setSelectedIngredient(doubtfulItem);
                        setShowModal(true);
                      }}
                      color="LIGHT_RED"
                    />
                  </View>
                );
              })}
            </Card>
          </>
        )}
    </>
  );
}
const styles = StyleSheet.create({
  ingredient: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default observer(IngredientListView);
