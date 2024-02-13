import React, { useState } from "react";
import { Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MlkitOcr from "react-native-mlkit-ocr";
import Button from "./Button";
import { LABELS } from "../constants/Labels";

interface IOcrImage {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function OcrImage({ setValue }: IOcrImage) {
  const [image, setImage] = useState(null);

  const launchCamera = async () => {
    let result = await ImagePicker?.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const resultFromUri = await MlkitOcr.detectFromUri(result.assets[0]?.uri);
      const text = resultFromUri.map((item) => item.text);
      setValue((prev) => prev + text.join());
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button
        label={LABELS.MAAK_FOTO_VAN_INGREDIENTEN}
        onPress={async () => {
          launchCamera();
        }}
      />
    </View>
  );
}
