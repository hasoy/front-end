import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Typography, Button, Card, Title } from "../components";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { Image } from "expo-image";
import { URLS } from "../constants/Host";

function TabScanner() {
  const { product } = useStore();
  const host = URLS.HOST;

  const [hasPermission, setHasPermission] = useState<Boolean>();

  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  // get permission for camera
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Typography label={LABELS.TOESTEMMING_CAMERA_AANVRAAG} />;
  }
  if (hasPermission === false) {
    return (
      <Card padding>
        <Typography label={LABELS.GEEN_TOESTEMMING_CAMERA} />
      </Card>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    product.setBarcode(data);
    await fetchBarcode(data.toString());
  };

  async function fetchBarcode(barcode: string) {
    const barcodeQueryUrl = `${host}/api/products?filters[barcode][$contains]=${barcode}&populate=*`;
    try {
      const response = await fetch(barcodeQueryUrl);
      const json = await response.json();
      product.setScannedProduct(json.data[0]?.attributes ?? null);
      if (json.data[0]?.attributes.productName) {
        navigation.navigate("TabProductDetails");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <>
      {scanned && !product.current_scannedProduct ? (
        <Card padding={scanned} scroll={false}>
          <Title
            level="2"
            label={`${LABELS.BARCODE}:${
              product.current_barcode
            } ${LABELS.NIET_GEVONDEN.toLowerCase()}`}
          />
          <Image
            style={styles.image}
            source={require("../assets/images/scan.png")}
            contentFit="contain"
          />
          <Button
            label={LABELS.OPNIEUW_SCANNEN}
            onPress={() => {
              setScanned(false);
            }}
            style={styles.space}
          />
          <Button
            label={LABELS.PRODUCT_TOEVOEGEN}
            onPress={() => {
              navigation.navigate("AddProduct" as never);
            }}
            style={styles.space}
            type="secondary"
          />
        </Card>
      ) : (
        <Card padding={false} scroll={false} style={styles.barcodeContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.icon}
            contentFit="contain"
          />
          <Title label={LABELS.SCAN_BARCODE} level="3" color="white" />
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcodescanner}
            barCodeTypes={[
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.upc_a,
            ]}
          ></BarCodeScanner>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  icon: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 0,
  },
  space: {
    justifyContent: "flex-end",
  },
  barcodescanner: {
    width: "100%",
    height: "30%",
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
