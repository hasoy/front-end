import { Button, Card, Title, Typography } from "../components";
import { LABELS } from "../constants/Labels";
import { useStore } from "../hooks/useStore";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ISchoolOfThought } from "../stores/user.store";
import { observer } from "mobx-react-lite";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/Colors";

interface ITabProfile {}
function TabProfile({}: ITabProfile) {
  const { user } = useStore();
  const colorScheme = useColorScheme();
  const Row = ({ children }) => <View style={styles.row}>{children}</View>;
  const schoolOfThoughtOptions = [
    {
      value: "hanbali",
      label: "Hanbali",
    },
    {
      value: "hanafi",
      label: "Hanafi",
    },
    {
      value: "shafi",
      label: "Shafi",
    },
    { value: "maliki", label: "Maliki" },
    { value: "default", label: "Geen wetschool" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Card padding>
        <Title label="Profiel"></Title>
        <Row>
          <Typography weight="500" label={LABELS.USERNAME}></Typography>
          <Typography label={user.current_user?.username}></Typography>
        </Row>
        <Row>
          <Typography weight="500" label={LABELS.EMAIL}></Typography>
          <Typography label={user.current_user?.email}></Typography>
        </Row>
        <Row>
          <Typography weight="500" label={LABELS.SCHOOL_OF_THOUGHT}></Typography>
          <Picker
            selectedValue={user.current_user.schoolOfThought}
            style={styles.picker}
            onValueChange={
              (itemValue: ISchoolOfThought) =>
                user.setUser({ ...user.current_user, schoolOfThought: itemValue })
              // TODO send request to backend to update user with /me route
            }
            dropdownIconColor={colorScheme === "dark" ? COLORS.LIGHT_BACKGROUND : COLORS.BLACK}
          >
            {schoolOfThoughtOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={colorScheme === "dark" && styles.dark}
              />
            ))}
          </Picker>
        </Row>
      </Card>
      <View style={styles.logoutButton}>
        <Button label={LABELS.LOG_OUT} onPress={() => user.logOut()} warnBeforeAction></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    width: "50%",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  dark: {
    color: COLORS.LIGHT_BACKGROUND,
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
  },
  logoutButton: {
    justifyContent: "flex-end",
    margin: 24,
  },
});

export default observer(TabProfile);
