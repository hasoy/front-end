import { useState } from "react";
import { View, Modal, StyleSheet, OpaqueColorValue, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Typography } from "./Typography";
import { LABELS } from "../constants/Labels";
import { Title } from "./Title";
import Button from "./Button";

interface IModal {
  title: string;
  visible: boolean;
  onDismiss: () => void;
  iconColor?: string | OpaqueColorValue;
  iconSize?: number;
  iconName?: string;
  message?: string;
}

export default function PopUp({
  title,
  message,
  visible,
  onDismiss,
  iconColor,
  iconSize,
  iconName,
}: IModal) {
  const [modalVisible, setModalVisible] = useState(visible);

  const toggleModal = () => {
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
      <Pressable style={styles.modalContainer} onPress={() => toggleModal()}>
        <View style={styles.view}>
          {iconName && <AntDesign name={iconName} color={iconColor} size={iconSize} />}
          <Title level="2" label={title} />
          <Typography label={message} />
          <Button label={LABELS.SLUITEN} onPress={toggleModal} style={styles.button} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "75%",
    height: "30%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    padding: 20,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(191, 191, 191, 0.9)",
  },
});
