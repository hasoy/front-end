import { AntDesign, FontAwesome } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { StyleSheet, View, SafeAreaView, useColorScheme } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { useNavigation } from "@react-navigation/native";
import { PopUp, Card, LinkText, Title, Button, Typography, Accordion, Row } from "../components";
import { PATHS } from "../constants/paths";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ISchoolOfThought } from "../stores/user.store";
import { COLORS } from "../constants/Colors";
import { schoolOfThoughtOptions } from "../constants/picker";
import BarcodeNotFound from "../components/BarcodeNotFound";

function TabProductDetails() {
  const { product, user } = useStore();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const userMadhab = user.current_user.schoolOfThought;
  const reportProduct = () => {
    navigation.navigate(PATHS.REPORT_PRODUCT as never);
  };

  if (product.current_scannedProduct === null && product.current_barcode) {
    <BarcodeNotFound />;
  }

  if (product.current_scannedProduct === null) {
    return (
      <Card padding>
        <Title label={LABELS.SCAN_EEN_PRODUCT} />
      </Card>
    );
  }

  const haramIngredients = product.current_scannedProduct.ingredients?.data
    .filter(
      (ingredient) =>
        ingredient.attributes.haram_ingredient.data !== null &&
        (ingredient.attributes.haram_ingredient.data?.attributes.ingredientState.schoolOfThought?.includes(
          userMadhab
        ) ||
          ingredient.attributes.haram_ingredient.data?.attributes.ingredientState.consensus)
    )
    .map((current_ingredient) => {
      return {
        ...current_ingredient.attributes.haram_ingredient.data.attributes.ingredientState,
        ingredientName: current_ingredient.attributes.title,
      };
    });
  const doubtfulIngredients = product.current_scannedProduct.ingredients?.data
    .filter(
      (ingredient) =>
        ingredient.attributes.doubtful_ingredient.data !== null &&
        (ingredient.attributes.doubtful_ingredient.data?.attributes.ingredientState.schoolOfThought?.includes(
          userMadhab
        ) ||
          ingredient.attributes.doubtful_ingredient.data?.attributes.ingredientState.consensus)
    )
    .map((current_ingredient) => {
      return {
        ...current_ingredient.attributes.doubtful_ingredient.data.attributes.ingredientState,
        ingredientName: current_ingredient.attributes.title,
      };
    });

  const checkMadhab = () => {
    if (product.current_scannedProduct?.vegan) {
      for (const haramIngredient of haramIngredients) {
        if (haramIngredient.title === "alcohol") {
          return LABELS.HARAM;
        }
      }
      return LABELS.VEGAN;
    }
    if (haramIngredients.length > 0) {
      for (const haramIngredient of haramIngredients) {
        if (haramIngredient.schoolOfThought?.includes(userMadhab) || haramIngredient.consensus) {
          return LABELS.HARAM;
        }
      }
    }
    if (doubtfulIngredients.length > 0) {
      for (const doubtfulIngredient of doubtfulIngredients) {
        if (
          doubtfulIngredient.schoolOfThought?.includes(userMadhab) ||
          doubtfulIngredient.consensus
        ) {
          return LABELS.TWIJFELACHTIG;
        }
      }
    }
    return LABELS.HALAL;
  };
  const getStatusButtonType = () => {
    const status = checkMadhab();
    if (status === LABELS.HARAM) {
      return "warning";
    }
    if (status === LABELS.TWIJFELACHTIG) {
      return "doubtful";
    }
    return "primary";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card padding>
        <Title label={product.current_scannedProduct?.productName} />
        <Title level="2" label={`Barcode: ${product.current_scannedProduct?.barcode}`} />
        <Row>
          <Typography weight="500" label={`${LABELS.SCHOOL_OF_THOUGHT}: `}></Typography>
          <Picker
            selectedValue={user.current_user?.schoolOfThought}
            style={styles.picker}
            onValueChange={(itemValue: ISchoolOfThought) =>
              user.setUser({ ...user.current_user, schoolOfThought: itemValue })
            }
            dropdownIconColor={colorScheme === "dark" ? COLORS.LIGHT_BACKGROUND : COLORS.BLACK}
          >
            {schoolOfThoughtOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={colorScheme === "dark" && styles.darkpicker}
              />
            ))}
          </Picker>
        </Row>
        {product.current_scannedProduct?.vegan && (
          <Row>
            <Title level="3" label={LABELS.VEGAN} />
            <FontAwesome name="leaf" size={24} color="green" />
          </Row>
        )}

        <Button
          label={checkMadhab()}
          type={getStatusButtonType()}
          onPress={undefined}
          shrink={!haramIngredients.length}
        ></Button>
        {haramIngredients.length > 0 && (
          <>
            <Title label={LABELS.HARAM_INGREDIENTEN} level="3" />
            <Card scroll={false} row style={styles.marginBottom}>
              {haramIngredients.map((haramItem) => {
                return (
                  <View key={uuid.v4().toString()} style={styles.ingredient}>
                    <LinkText
                      label={haramItem.ingredientName}
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
              {doubtfulIngredients.map((doubtfulItem) => {
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
                    <AntDesign name="warning" size={18} color="orange" />
                  </View>
                );
              })}
            </Card>
          </>
        )}
        {product.current_scannedProduct?.ingredients.data && (
          <Accordion title={LABELS.ALLE_INGREDIENTEN}>
            <Typography label={product.current_scannedProduct?.allIngredients ?? ""} />
          </Accordion>
        )}
        {showModal && (
          <PopUp
            title={product.current_selectedIngredient.ingredientName}
            subTitle={product.current_selectedIngredient.title}
            message={product.current_selectedIngredient.explanation}
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </Card>
      <View style={styles.footer}>
        <Button label={LABELS.PRODUCT_FOUT_MELDEN} onPress={reportProduct} />
        <Button
          type="secondary"
          label={LABELS.OPNIEUW_SCANNEN}
          onPress={() => {
            navigation.navigate(PATHS.SCANNER as never);
          }}
        />
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
    gap: 8,
  },
  picker: {
    width: "50%",
  },
  darkpicker: {
    color: COLORS.LIGHT_BACKGROUND,
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
});

export default observer(TabProductDetails);
