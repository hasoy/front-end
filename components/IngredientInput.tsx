import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import MlkitOcr from "react-native-mlkit-ocr";

interface IIngredientInput {
  value?: string;
  placeholder?: string;
  label?: string;
  setIngredients?: React.Dispatch<React.SetStateAction<string>>;
}
export default function IngredientInput({
  placeholder,
  label,
  value,
  setIngredients,
}: IIngredientInput) {
  const handleInput = (text: string) => {
    setIngredients(text);
  };

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
      setIngredients((prev) => prev + text.join());
    }
  };

  return (
    <>
      <TextInput
        style={styles.input}
        label={label}
        onChangeText={handleInput}
        value={value}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="next"
        blurOnSubmit={false}
        multiline
        mode="outlined"
        right={<TextInput.Icon icon="camera" onPress={launchCamera} />}
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
  },
});
