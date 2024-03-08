import { observer } from "mobx-react-lite";
import { Accordion, Card } from "../components";
import { StyleSheet } from "react-native";
import { LABELS } from "../constants/Labels";
import { Chip, HelperText, Text, TextInput } from "react-native-paper";
import { useStore } from "../hooks/useStore";
import { View } from "../components/Themed";
import { COLORS } from "../constants/Colors";
import { useRef, useState } from "react";

function ContactPage() {
  const { user } = useStore();
  const [customAllergy, setCustomAllergy] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const customAllergyRef = useRef(null);
  let { allergies } = user.current_user;
  let tempAllergies = user.custom_allergies;
  const FAQ = [
    { title: LABELS.CONTACT.WIE_ZIJN_WIJ.TITLE, desc: LABELS.CONTACT.WIE_ZIJN_WIJ.DESC },
    { title: LABELS.CONTACT.MISSIE_EN_VISIE.TITLE, desc: LABELS.CONTACT.MISSIE_EN_VISIE.DESC },
    { title: LABELS.CONTACT.MADHAHIB.TITLE, desc: LABELS.CONTACT.MADHAHIB.DESC },
    { title: LABELS.CONTACT.CONTACT.TITLE, desc: LABELS.CONTACT.CONTACT.DESC },
  ];
  if (!allergies) allergies = [];
  if (!user.custom_allergies) tempAllergies = [];

  const removeCustomFilter = (item: string) => {
    user.setUser({
      ...user.current_user,
      customAllergies: tempAllergies?.filter((allergie) => allergie !== item),
    });
  };

  const addNewCustomFilter = () => {
    if (!customAllergy) return;
    if (user.current_user.customAllergies?.includes(customAllergy)) {
      setErrorMessage(`${customAllergy} bestaat al`);
      return;
    }
    user.setUser({
      ...user.current_user,
      customAllergies: [...tempAllergies, customAllergy],
    });
    setCustomAllergy("");
    customAllergyRef.current.focus();
  };

  return (
    <Card padding scroll={false}>
      <Text variant="headlineMedium">{LABELS.DETECTEER_WOORDEN}</Text>
      {/* <View style={styles.chips}>
        {allergiesList.map((item) => (
          <Chip
            selected={allergies?.includes(item)}
            key={item}
            style={allergies?.includes(item) ? styles.selected : undefined}
            onPress={() =>
              user.setUser({
                ...user.current_user,
                allergies: allergies?.includes(item)
                  ? allergies?.filter((allergie) => allergie !== item)
                  : [...allergies, item],
              })
            }
          >
            {item}
          </Chip>
        ))}
      </View> */}
      <TextInput
        label={LABELS.VOEG_EEN_WOORD_TOE}
        mode="outlined"
        value={customAllergy}
        ref={customAllergyRef}
        error={!!errorMessage}
        onSubmitEditing={addNewCustomFilter}
        onChangeText={(text) => {
          setCustomAllergy(text);
          setErrorMessage("");
        }}
      ></TextInput>
      {errorMessage && <HelperText type={"error"}>{errorMessage}</HelperText>}
      <View style={styles.chips}>
        {tempAllergies.map((item) => (
          <Chip key={item} style={styles.selected} onClose={() => removeCustomFilter(item)}>
            {item}
          </Chip>
        ))}
      </View>
      <Text variant="headlineMedium">{LABELS.FAQ}</Text>
      {FAQ.map((item) => (
        <Accordion title={item.title} key={item.title}>
          <Text>{item.desc}</Text>
        </Accordion>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  selected: {
    backgroundColor: COLORS.GREEN_2,
  },
  chips: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default observer(ContactPage);
