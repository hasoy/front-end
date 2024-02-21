import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, SafeAreaView, useColorScheme } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import { PopUp, Card, Title, Button, Typography, Row } from "../components";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ISchoolOfThought } from "../stores/user.store";
import BarcodeNotFound from "../components/BarcodeNotFound";
import { ScanAgainButton } from "../components/ScanAgainButton";
import AllIngredients from "../components/AllIngredients";
import IngredientListView from "../components/IngredientListView";
import { PATHS, schoolOfThoughtOptions, COLORS, LABELS } from "../constants";

function TabProductDetails() {
  const { product, user } = useStore();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
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

  const getStatusButtonType = () => {
    const status = product.getProductStatus();
    if (status === LABELS.HALAL || status === LABELS.VEGAN) return "primary";
    return "warning";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card padding>
        <Title label={product.current_scannedProduct?.productName} />
        <Row>
          <Typography
            weight="500"
            label={`${LABELS.SCHOOL_OF_THOUGHT}: `}
          ></Typography>
          <Picker
            selectedValue={user.current_user?.schoolOfThought}
            style={styles.picker}
            onValueChange={(itemValue: ISchoolOfThought) =>
              user.setUser({ ...user.current_user, schoolOfThought: itemValue })
            }
            dropdownIconColor={
              colorScheme === "dark" ? COLORS.LIGHT_BACKGROUND : COLORS.BLACK
            }
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
        {product.current_scannedProduct?.vegan && !product.has_alcohol && (
          <Row>
            <Title level="3" label={LABELS.VEGAN} />
            <FontAwesome name="leaf" size={24} color="green" />
          </Row>
        )}

        <Button
          label={product.getProductStatus()}
          type={getStatusButtonType()}
          onPress={() => undefined}
          shrink={!product.haram_ingredients_list.length}
          style={styles.statusButton}
        ></Button>
        <IngredientListView setShowModal={setShowModal} />
        <AllIngredients />
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
        <Button
          type="secondary"
          label={LABELS.PRODUCT_FOUT_MELDEN}
          onPress={reportProduct}
        />
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
  statusButton: {
    marginVertical: 8,
    pointerEvents: "none",
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
