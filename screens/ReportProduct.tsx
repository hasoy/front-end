import { StyleSheet } from "react-native";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Button, Title, RadioButton, Card, PopUp } from "../components";
import { LABELS } from "../constants/Labels";
import { useState } from "react";
import { IReportReason } from "../types/schemas.types";
import URLS from "../constants/Host";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "../hooks/useFetch";
import { TextInput } from "react-native-paper";

function ReportProduct() {
  const { product } = useStore();
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
      // user: +user.current_user?.id,
      product: +product.current_scannedProduct?.id,
    };
    if (product.current_scannedProduct?.barcode) {
      const response = await Fetch({
        url: `${URLS.HOST}${URLS.REPORTED_PRODUCT}`,
        method: "POST",
        body: { data: newReport },
      });
      if (response.data.attributes) setShowModal(true);
      // TODO improve error handling
      if (response?.error) alert(response.error);
    }
  };

  return (
    <Card padding scroll>
      {product.current_scannedProduct?.productName && (
        <Title
          label={product.current_scannedProduct?.productName ?? ""}
          level="2"
        />
      )}
      <Title label={LABELS.KIES_REDEN} level="3" />
      <RadioButton
        data={options}
        onSelect={(value) => setReason(value as IReportReason)}
      />
      <TextInput
        onChangeText={(text) => setExplanation(text)}
        value={explanation}
        label={LABELS.TOELICHTING}
        placeholder={LABELS.VUL_UW_TOELICHTING_TOE}
        multiline
        mode="outlined"
      />
      <Button
        label={LABELS.VERZENDEN}
        onPress={() => sendReport()}
        style={styles.bottom}
        disabled={!reason || !product.current_scannedProduct?.barcode}
      />
      {showModal && (
        <PopUp
          title={LABELS.PRODUCT_REPORT_SENT}
          message={LABELS.PRODUCT_REPORT_SENT_DESC}
          visible={showModal}
          onDismiss={() => navigation.goBack()}
          onButtonPress={() => navigation.goBack()}
          buttonLabel={LABELS.OK}
          cancelButton={false}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
  },
});

export default observer(ReportProduct);
