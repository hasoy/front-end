import { useState } from "react";
import { View, Modal, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Typography } from "./Typography";
import { LABELS } from "../constants/Labels";

interface IModal {
  label: string;
  visible: boolean;
  onDismiss: () => void;
}

export default function PopUp({ label, visible, onDismiss }: IModal) {
  const [modalVisible, setModalVisible] = useState(visible);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
        <View style={styles.view}>
          <AntDesign name="checkcircle" color="green" size={30} />
          <Typography label={label} />
          <Pressable onPress={toggleModal} style={styles.closeButton}>
            <Typography label={LABELS.SLUITEN} color="white" weight="700" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "75%",
    height: "30%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "20",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BFBFBF",
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
