import { observer } from "mobx-react-lite";
import { Accordion, Card, Typography } from "../components";
import { StyleSheet } from "react-native";
import { LABELS } from "../constants/Labels";

function ContactPage() {
  const FAQ = [
    { title: LABELS.CONTACT.WIE_ZIJN_WIJ.TITLE, desc: LABELS.CONTACT.WIE_ZIJN_WIJ.DESC },
    { title: LABELS.CONTACT.MADHAHIB.TITLE, desc: LABELS.CONTACT.MADHAHIB.TOELICHTING },
    { title: LABELS.CONTACT.DEV.TITLE, desc: LABELS.CONTACT.DEV.DESC },
    { title: LABELS.CONTACT.CONTACT.TITLE, desc: LABELS.CONTACT.CONTACT.DESC },
    { title: LABELS.CONTACT.HELP.TITLE, desc: LABELS.CONTACT.HELP.DESC },
  ];
  return (
    <Card padding scroll={false}>
      {FAQ.map((item) => (
        <Accordion title={item.title} key={item.title}>
          <Typography label={item.desc}></Typography>
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
});

export default observer(ContactPage);
