import { observer } from "mobx-react-lite";
import { Accordion, Card } from "../components";
import { allergiesList } from "../constants/allergies";
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
    { title: LABELS.CONTACT.MADHAHIB.TITLE, desc: LABELS.CONTACT.MADHAHIB.TOELICHTING },
    { title: LABELS.CONTACT.DEV.TITLE, desc: LABELS.CONTACT.DEV.DESC },
    { title: LABELS.CONTACT.CONTACT.TITLE, desc: LABELS.CONTACT.CONTACT.DESC },
    { title: LABELS.CONTACT.HELP.TITLE, desc: LABELS.CONTACT.HELP.DESC },
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
      <Text variant="headlineMedium">{LABELS.ALLERGIEEN}</Text>
      <View style={styles.chips}>
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
      </View>
      <TextInput
        label={LABELS.DETECTEER_WOORDEN}
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
          <Chip
            key={item}
            selected={allergies?.includes(item)}
            style={styles.selected}
            onClose={() => removeCustomFilter(item)}
          >
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
    backgroundColor: COLORS.GREEN,
  },
  chips: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default observer(ContactPage);
