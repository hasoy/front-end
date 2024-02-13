import { FontAwesome } from "@expo/vector-icons";
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
import { ScanAgainButton } from "../components/ScanAgainButton";

function TabProductDetails() {
  const { product, user } = useStore();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const userMadhab = user?.current_user?.schoolOfThought;
  if (product.current_scannedProduct === null && product?.current_barcode) {
    return <BarcodeNotFound />;
  }
  if (product.current_scannedProduct === null) {
    return (
      <Card scroll={false} padding>
        <Title level="2" label={LABELS.SCAN_EEN_PRODUCT} />
        <ScanAgainButton />
      </Card>
    );
  }

  const reportProduct = () => {
    navigation.navigate(PATHS.REPORT_PRODUCT as never);
  };
  const { allIngredients, productName, ingredients } = product.current_scannedProduct;

  const filteredIngredients = ingredients?.data
    ?.filter((ingredient) => {
      const { id, attributes } = ingredient.attributes.ingredient_state?.data;
      return id && (attributes.schoolOfThought?.includes(userMadhab) || attributes.consensus);
    })
    .map((current_ingredient) => ({
      ...current_ingredient.attributes.ingredient_state?.data.attributes,
      ingredientName: current_ingredient.attributes.title,
    }));
  const haramIngredients = filteredIngredients?.filter((ingredient) => ingredient.haram === true);
  let hasAlcohol = haramIngredients?.some((ingredient) => ingredient.title === "alcohol");
  const doubtfulIngredients = filteredIngredients?.filter(
    (ingredient) => ingredient.haram === null || false
  );

  const halalRegex = /h[ea]laa?l/i;
  const containsHalalWord = halalRegex.test(allIngredients) || halalRegex.test(productName);

  const checkStatus = () => {
    if (containsHalalWord) return LABELS.HALAL;
    // if vegan return halal, except if alcohol is present
    if (hasAlcohol) return LABELS.HARAM;
    if (product.current_scannedProduct?.vegan && !hasAlcohol) {
      return LABELS.VEGAN;
    }
    for (const haramIngredient of haramIngredients) {
      if (
        haramIngredient.schoolOfThought?.includes(userMadhab) ||
        haramIngredient.consensus === true
      ) {
        return LABELS.HARAM;
      }
    }
    for (const doubtfulIngredient of doubtfulIngredients) {
      if (
        doubtfulIngredient.schoolOfThought?.includes(userMadhab) ||
        doubtfulIngredient.consensus === true
      ) {
        return LABELS.HARAM_DOOR_ONBEKENDE_OORSPRONG;
      }
    }
    return LABELS.HALAL;
  };

  const getStatusButtonType = () => {
    const status = checkStatus();
    if (status === LABELS.HALAL || status === LABELS.VEGAN) return "primary";
    return "warning";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card padding>
        <Title label={product.current_scannedProduct?.productName} />
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
        {product.current_scannedProduct?.vegan && !hasAlcohol && (
          <Row>
            <Title level="3" label={LABELS.VEGAN} />
            <FontAwesome name="leaf" size={24} color="green" />
          </Row>
        )}

        <Button
          label={checkStatus()}
          type={getStatusButtonType()}
          onPress={() => undefined}
          shrink={!haramIngredients.length}
          style={styles.statusButton}
        ></Button>
        {haramIngredients.length > 0 &&
          (hasAlcohol || !product.current_scannedProduct.vegan) &&
          !containsHalalWord && (
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
                      {/* <AntDesign name="exclamationcircle" size={18} color="red" /> */}
                    </View>
                  );
                })}
              </Card>
            </>
          )}
        {doubtfulIngredients.length > 0 &&
          !product.current_scannedProduct.vegan &&
          !containsHalalWord && (
            <>
              <Title label={LABELS.ONBEKENDE_INGREDIENTEN} level="3" />
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
                      {/* <AntDesign name="warning" size={18} color="orange" /> */}
                    </View>
                  );
                })}
              </Card>
            </>
          )}
        {product.current_scannedProduct?.allIngredients && (
          <Accordion title={LABELS.ALLE_INGREDIENTEN}>
            <Typography label={product.current_scannedProduct?.allIngredients} />
          </Accordion>
        )}
        {showModal && (
          <PopUp
            title={product.current_selectedIngredient.title}
            subTitle={product.current_selectedIngredient.name}
            message={product.current_selectedIngredient.explanation}
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          />
        )}
      </Card>
      <View style={styles.footer}>
        <Button
          label={LABELS.OPNIEUW_SCANNEN}
          onPress={() => {
            navigation.navigate(PATHS.SCANNER as never);
          }}
        />
        <Button type="secondary" label={LABELS.PRODUCT_FOUT_MELDEN} onPress={reportProduct} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
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
  statusButton: {
    marginVertical: 8,
    pointerEvents: "none",
  },
  paddingRight: {
    paddingRight: 6,
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
