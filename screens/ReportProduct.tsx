import { KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Input, Title, Typography, RadioButton, Card, PopUp } from "../components";
import { LABELS } from "../constants/Labels";
import { useState } from "react";
import { IReportReason } from "../types/schemas.types";
import { URLS } from "../constants/Host";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "../hooks/useFetch";
import { Keyboard } from "react-native";

function ReportProduct() {
  const { product, user } = useStore();
  const { Fetch } = useFetch();
  const [reason, setReason] = useState<IReportReason | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [explanation, setExplanation] = useState("");
  const navigation = useNavigation();
  const options = [
    { label: LABELS.INCORRECT_PRODUCT_NAAM, value: "incorrectName" },
    { label: LABELS.NIET_HALAL, value: "haram" },
    { label: LABELS.NIET_HARAM, value: "halal" },
    { label: LABELS.PRODUCT_TWIJFELACHTIG, value: "doubtful" },
    { label: LABELS.INGREDIENT_ONTBREEKT, value: "ingredientMissing" },
  ];

  interface IReportedProduct {
    barcode: string;
    reason: IReportReason | undefined;
    customReason?: string;
    user?: number;
    product: number;
  }

  const sendReport = async () => {
    const newReport: IReportedProduct = {
      barcode: product.current_scannedProduct?.barcode ?? "",
      reason: reason ?? null,
      customReason: explanation,
      user: +user.current_user?.id,
      product: +product.current_scannedProduct?.id,
    };
    if (product.current_scannedProduct?.barcode) {
      const response = await Fetch({
        url: `${URLS.HOST}${URLS.REPORTED_PRODUCT}`,
        method: "POST",
        body: { data: newReport },
      });
      console.log(response);
      if (response.data.attributes) setShowModal(true);
      // TODO improve error handling
      if (response?.error) alert(response.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={20}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Card padding>
          <Title label={product.current_scannedProduct?.productName ?? ""} level="1" />
          {product.current_scannedProduct?.barcode && (
            <Typography label={`${LABELS.BARCODE}: ${product.current_scannedProduct.barcode}`} />
          )}
          <Title label={LABELS.KIES_REDEN} level="2" />
          <RadioButton data={options} onSelect={(value) => setReason(value as IReportReason)} />
          <Input
            onChangeText={(text) => setExplanation(text)}
            value={explanation}
            label={LABELS.TOELICHTING}
            placeholder={LABELS.VUL_UW_TOELICHTING_TOE}
            style={styles.stretch}
            multiline
          />
          <Button
            label={LABELS.VERZENDEN}
            onPress={() => sendReport()}
            style={styles.bottom}
            disabled={!reason}
          />
          {showModal && (
            <PopUp
              title={LABELS.PRODUCT_REPORT_SENT}
              message={LABELS.PRODUCT_REPORT_SENT_DESC}
              visible={showModal}
              onDismiss={() => navigation.goBack()}
            />
          )}
        </Card>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
  },
  stretch: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default observer(ReportProduct);
