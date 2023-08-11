import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RootTabScreenProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../components/Typography";
import Button from "../components/Button";
import Card from "../components/Card";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { Image } from "expo-image";
import { Title } from "../components";

function TabScanner({}: RootTabScreenProps<"TabScanner">) {
  const { product } = useStore();
  const host = "https://lionfish-app-54sxn.ondigitalocean.app";
  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [productPreview, setProductPreview] = useState("");
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (product.current_scannedProduct) navigation.navigate("TabProductDetails");
  }, [product.current_scannedProduct, scanned]);
  if (hasPermission === null) {
    return <Typography label={LABELS.TOESTEMMING_CAMERA_AANVRAAG} />;
  }
  if (hasPermission === false) {
    return (
      <Card>
        <Typography label={LABELS.GEEN_TOESTEMMING_CAMERA} />
      </Card>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setScannedBarcode(data);
    await fetchBarcode(data.toString());
  };

  async function fetchBarcode(barcode: string) {
    const barcodeQueryUrl = `${host}/api/products?filters[barcode][$contains]=${barcode}&populate=*`;
    try {
      const response = await fetch(barcodeQueryUrl);
      const json = await response.json();
      product.setScannedProduct(json.data ? json.data[0].attributes : null);
      setProductPreview(json.data ? json.data[0].attributes.productName : "");
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <Card scroll={false}>
      {scanned && !product.current_scannedProduct ? (
        <>
          <Image
            style={styles.image}
            source={require("../assets/images/scan.png")}
            contentFit="cover"
          />
          {scannedBarcode && <Typography label={scannedBarcode} />}
          {productPreview && <Typography label={productPreview} />}
          <Button
            label={LABELS.OPNIEUW_SCANNEN}
            onPress={() => {
              setScanned(false);
            }}
          />
        </>
      ) : (
        <View style={styles.barcodeContainer}>
          <Title label="Scan barcode" level="3" />
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcodescanner}
          ></BarCodeScanner>
        </View>
      )}
      {product.current_scannedProduct !== null && scanned && (
        <Typography
          label={`${LABELS.GESCAND_PRODUCT}: \n ${product.current_scannedProduct.productName}`}
        ></Typography>
      )}
      {product.current_scannedProduct === null && scanned && (
        <View>
          {product?.current_scannedProduct && (
            <Typography
              label={`${LABELS.PRODUCT_MET_BARCODE} ${product.current_scannedProduct?.barcode} ${LABELS.NIET_GEVONDEN}`}
            />
          )}
          <Image
            source="/images/product_not_found.png"
            contentFit="cover"
            transition={1000}
            style={styles.image}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  barcodescanner: {
    width: "80%",
    height: "35%",
    alignSelf: "center",
  },
  barcodeContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});

export default observer(TabScanner);
