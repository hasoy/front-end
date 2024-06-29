import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Typography, Card, Title, Button } from "../components";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { Image } from "expo-image";
import URLS from "../constants/Host";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useFetch } from "../hooks/useFetch";
import { PATHS } from "../constants/paths";
import BarcodeNotFound from "../components/BarcodeNotFound";
import { Camera } from "expo-camera";

function TabScanner() {
  const { product, user } = useStore();
  const host = URLS.HOST;
  const isFocused = useIsFocused();
  const { Fetch } = useFetch();

  const [scanning, setScanning] = useState(false);
  const navigation = useNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    user.checkLoggedIn();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanning) return;
    product.setBarcode(data);
    await fetchBarcode(data?.toString());
    product.setScanned(true);
  };

  const postScannedProduct = async (productId: string) => {
    await Fetch({
      url: `${host}${URLS.SCANS}`,
      method: "POST",
      body: {
        data: { product: +productId },
      },
    });
  };

  async function fetchBarcode(barcode: string) {
    if (barcode.startsWith("0")) barcode = barcode.slice(1);
    const barcodeQueryUrl = `${host}/api/products?filters[barcode][$contains]=${barcode}&${URLS.POPULATE_INGREDIENTS}`;
    try {
      setScanning(true);
      const response = await Fetch({ url: barcodeQueryUrl });
      if (response.data[0]?.attributes) {
        product.setScannedProduct({
          ...response.data[0]?.attributes,
          id: response.data[0]?.id,
        });
        postScannedProduct(response.data[0]?.id);
        navigation.navigate(PATHS.PRODUCT_DETAILS as never);
      } else product.setScannedProduct(null);
    } catch (error) {
      console.error(error);
      product.setScannedProduct(null);
    } finally {
      setScanning(false);
    }
  }

  if (permission?.granted === false) {
    return (
      <Card padding>
        <Typography label={LABELS.GEEN_TOESTEMMING_CAMERA} />
        <Button
          label={LABELS.TOESTEMMING_CAMERA_AANVRAAG}
          onPress={requestPermission}
        />
      </Card>
    );
  }

  return (
    <>
      {product.scanned && !product.current_scannedProduct ? (
        <BarcodeNotFound />
      ) : (
        <Card padding={false} scroll={false} style={styles.barcodeContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.icon}
            contentFit="contain"
          />
          <Title label={LABELS.SCAN_BARCODE} level="3" />
          {isFocused && (
            <Camera
              barCodeScannerSettings={{
                barCodeTypes: [
                  BarCodeScanner.Constants.BarCodeType.ean13,
                  BarCodeScanner.Constants.BarCodeType.upc_a,
                  BarCodeScanner.Constants.BarCodeType.ean8,
                  BarCodeScanner.Constants.BarCodeType.code128,
                ],
              }}
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.barcodescanner}
            />
          )}
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
    width: "75%",
    height: "50%",
  },
  barcodeContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: "100%",
  },
});

export default observer(TabScanner);
