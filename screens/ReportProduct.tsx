import { StyleSheet } from "react-native";
import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Input, Title, Typography } from "../components";
import RadioButton from "../components/RadioButton";
import { LABELS } from "../constants/Labels";
import { useState } from "react";
import { IReportReason } from "../types/schemas.types";
import { URLS } from "../constants/Host";
import PopUp from "../components/PopUp";
import { useNavigation } from "@react-navigation/native";

function ReportProduct() {
  const { product } = useStore();
  const [reason, setReason] = useState<IReportReason | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [explanation, setExplanation] = useState<string>("");
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
    reportedBy?: string;
  }

  const sendReport = () => {
    const newReport: IReportedProduct = {
      barcode: product.current_scannedProduct?.barcode ?? "",
      reason: reason ?? undefined,
      customReason: explanation,
    };
    // TODO add post for new report
    if (product.current_scannedProduct?.barcode) {
      fetch(`${URLS.HOST}${URLS.REPORTED_PRODUCT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newReport }),
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
      <Title label={product.current_scannedProduct?.productName ?? ""} level="1" />
      {product.current_scannedProduct?.barcode && (
        <Typography label={`${LABELS.BARCODE}: ${product.current_scannedProduct.barcode}`} />
      )}
      <Title label={LABELS.KIES_REDEN} level="3" />
      <RadioButton data={options} onSelect={(value) => setReason(value)} />
      <Input
        setState={setExplanation}
        value={explanation}
        label={LABELS.TOELICHTING}
        placeholder={LABELS.VUL_UW_TOELICHTING_TOE}
        style={styles.stretch}
      />
      <Button label={LABELS.VERZENDEN} onPress={() => sendReport()} style={styles.bottom} />
      {showModal && (
        <PopUp
          title={LABELS.PRODUCT_REPORT_SENT}
          message={LABELS.PRODUCT_REPORT_SENT_DESC}
          visible={showModal}
          onDismiss={() => navigation.goBack()}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
  },
  stretch: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default observer(ReportProduct);
