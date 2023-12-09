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
import { useIsFocused } from "@react-navigation/native";
import SelectMadhab from "./SelectMadhab";
import { useFetch } from "../hooks/useFetch";
import { IScan } from "../types/schemas.types";
import { PATHS } from "../constants/paths";

function TabScanner() {
  const { product, user } = useStore();
  const host = URLS.HOST;
  const isFocused = useIsFocused();
  const { Fetch } = useFetch();

  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const navigation = useNavigation();

  // get permission for camera
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    product.setBarcode(data);
    await fetchBarcode(data.toString());
    setScanned(true);
  };

  const postScannedProduct = async (productId: string) => {
    await Fetch<IScan>({
      url: `${host}${URLS.SCANS}`,
      method: "POST",
      body: { scan: user.current_user?.id, product: +productId },
    });
  };

  async function fetchBarcode(barcode: string) {
    const barcodeQueryUrl = `${host}/api/products?filters[barcode][$contains]=${barcode}&${URLS.POPULATE_INGREDIENTS}`;
    if (scanning) return null;
    try {
      setScanning(true);
      const response = await Fetch({ url: barcodeQueryUrl });
      if (response.data[0]?.attributes) {
        product.setScannedProduct({ ...response.data[0]?.attributes, id: response.data[0]?.id });
        postScannedProduct(response.data[0]?.id);
        navigation.navigate(PATHS.PRODUCT_DETAILS);
      } else product.setScannedProduct(null);
    } catch (error) {
      console.error(error);
      product.setScannedProduct(null);
      return null;
    } finally {
      setScanning(false);
    }
  }

  if (user.current_user !== null && !user.current_user?.schoolOfThought) {
    return <SelectMadhab />;
  }
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
              navigation.navigate(PATHS.ADD_PRODUCT as never);
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
          <Title label={LABELS.SCAN_BARCODE} level="3" />
          {isFocused && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.barcodescanner}
              barCodeTypes={[
                BarCodeScanner.Constants.BarCodeType.ean13,
                BarCodeScanner.Constants.BarCodeType.upc_a,
                BarCodeScanner.Constants.BarCodeType.ean8,
              ]}
            />
          )}
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
