import { observer } from "mobx-react-lite";
import { Accordion, Card } from "../components";
import { allergiesList } from "../constants/allergies";
import { StyleSheet } from "react-native";
import { LABELS } from "../constants/Labels";
import { Chip, Text } from "react-native-paper";
import { useStore } from "../hooks/useStore";
import { View } from "../components/Themed";
import { COLORS } from "../constants/Colors";

function ContactPage() {
  const { user } = useStore();
  let { allergies } = user.current_user;
  const FAQ = [
    { title: LABELS.CONTACT.WIE_ZIJN_WIJ.TITLE, desc: LABELS.CONTACT.WIE_ZIJN_WIJ.DESC },
    { title: LABELS.CONTACT.MADHAHIB.TITLE, desc: LABELS.CONTACT.MADHAHIB.TOELICHTING },
    { title: LABELS.CONTACT.DEV.TITLE, desc: LABELS.CONTACT.DEV.DESC },
    { title: LABELS.CONTACT.CONTACT.TITLE, desc: LABELS.CONTACT.CONTACT.DESC },
    { title: LABELS.CONTACT.HELP.TITLE, desc: LABELS.CONTACT.HELP.DESC },
  ];
  if (!allergies) allergies = [];
  return (
    <Card padding scroll={false}>
      <Text variant="headlineMedium">FAQ</Text>
      {FAQ.map((item) => (
        <Accordion title={item.title} key={item.title}>
          <Text>{item.desc}</Text>
        </Accordion>
      ))}

      <Text variant="headlineMedium">Allergieën</Text>
      <View style={styles.chips}>
        {allergiesList.map((item) => (
          <Chip
            selected={allergies?.includes(item)}
            key={item}
            style={allergies?.includes(item) ? styles.selected : ""}
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
