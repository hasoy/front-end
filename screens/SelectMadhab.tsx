import { useEffect, useState } from "react";
import { Button, Card, RadioButton, Title } from "../components";
import { LABELS } from "../constants/Labels";
import { ISchoolOfThought } from "../stores/user.store";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { KEYS } from "../constants/Keys";

function SelectMadhab() {
  const { user } = useStore();
  useEffect(() => {
    user.checkLoggedIn();
  }, []);
  const [madhab, setMadhab] = useState<ISchoolOfThought>(user.current_user.schoolOfThought ?? null);
  const options = [
    { label: LABELS.HANAFI, value: KEYS.MADHABS.HANAFI },
    { label: LABELS.SHAFI, value: KEYS.MADHABS.SHAFI },
    { label: LABELS.MALIKI, value: KEYS.MADHABS.MALIKI },
    { label: LABELS.HANBALI, value: KEYS.MADHABS.HANBALI },
    { label: LABELS.NO_SCHOOL_OF_THOUGHT, value: KEYS.MADHABS.DEFAULT },
  ];

  const saveMadhab = () => {
    user.setUser({ ...user.current_user, schoolOfThought: madhab });
  };

  return (
    <Card padding>
      <Title label={LABELS.CHOOSE_SCHOOL_OF_THOUGHT} />
      <RadioButton data={options} onSelect={(value) => setMadhab(value as ISchoolOfThought)} />
      <Button label={LABELS.SAVE} disabled={!madhab} onPress={saveMadhab}></Button>
    </Card>
  );
}
export default observer(SelectMadhab);
