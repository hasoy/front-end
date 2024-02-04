import { useState } from "react";
import { Modal, StyleSheet, OpaqueColorValue, View, useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LABELS } from "../constants/Labels";
import { COLORS } from "../constants/Colors";
import { Title, Typography } from "./";
import Button from "./Button";

interface IModal {
  title: string;
  subTitle?: string;
  visible: boolean;
  onDismiss: () => void;
  iconColor?: string | OpaqueColorValue;
  iconSize?: number;
  iconName?: string;
  message?: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

export default function PopUp({
  title,
  message,
  visible,
  onDismiss,
  iconColor,
  iconSize,
  iconName,
  subTitle,
  buttonLabel,
  onButtonPress,
}: IModal) {
  const [modalVisible, setModalVisible] = useState(visible);
  const colorScheme = useColorScheme();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    onDismiss();
  };

  const handleButton = () => {
    if (onButtonPress) onButtonPress();
    setModalVisible(!modalVisible);
    onDismiss();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
      onDismiss={onDismiss}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.view, colorScheme === "dark" ? styles.dark : styles.light]}>
          <>
            {iconName && <AntDesign name={iconName} color={iconColor} size={iconSize} />}
            <Title level="2" label={title} />
            {subTitle && <Title level="3" label={subTitle} />}
            {message && <Typography label={message} style={styles.text} />}
            {onButtonPress && (
              <Button label={buttonLabel ?? LABELS.AKKOORD} onPress={handleButton} />
            )}
            <Button
              type={onButtonPress ? "secondary" : "primary"}
              label={LABELS.TERUG}
              onPress={toggleModal}
            />
          </>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "85%",
    justifyContent: "space-between",
    alignContent: "center",
    padding: 20,
    borderRadius: 10,
    gap: 6,
  },
  text: {
    marginVertical: 8,
  },
  dark: {
    backgroundColor: COLORS.DARK_GRAY,
  },
  light: {
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(191, 191, 191, 0.9)",
  },
});
