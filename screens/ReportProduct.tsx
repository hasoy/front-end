import { StyleSheet } from "react-native";
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

interface IReportedProduct {
  productName: string;
}

function ReportProduct() {
  const { product } = useStore();
  const [reason, setReason] = useState<IReportReason | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [explanation, setExplanation] = useState<string>("");
  const options = [
    { label: LABELS.INCORRECT_PRODUCT_NAAM, value: "incorrectName" },
    { label: LABELS.NIET_HALAL, value: "haram" },
    { label: LABELS.NIET_HARAM, value: "halal" },
    { label: LABELS.PRODUCT_TWIJFELACHTIG, value: "doubtful" },
    { label: LABELS.INGREDIENT_ONTBREEKT, value: "ingredientMissing" },
  ];

  useEffect(() => {
    console.log(explanation);
  }, [explanation]);

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
          console.log(data);
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
    <Card>
      <Title label={product.current_scannedProduct?.productName ?? ""} level="1" />
      {product.current_scannedProduct?.barcode && (
        <Typography label={`${LABELS.BARCODE}: ${product.current_scannedProduct.barcode}`} />
      )}
      <Title label={LABELS.KIES_REDEN} level="3" />
      <RadioButton data={options} onSelect={(value) => setReason(value)} />
      <Input setState={setExplanation} value={explanation} label={LABELS.TOELICHTING} />
      <Button label={LABELS.VERZENDEN} onPress={() => sendReport()} />
      {showModal && <PopUp label="test" visible={showModal} />}
    </Card>
  );
}

const styles = StyleSheet.create({});

export default observer(ReportProduct);
