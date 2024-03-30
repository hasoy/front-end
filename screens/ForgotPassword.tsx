import { observer } from "mobx-react-lite";
import URLS from "../constants/Host";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks/useStore";
import { LABELS } from "../constants/Labels";
import { useFetch } from "../hooks/useFetch";
import { Button, Card, Input, PopUp } from "../components";

const host = URLS.HOST;
const postUrl = `${host}${URLS.FORGOT_PASSWORD}`;

function ForgotPassword() {
  const { user } = useStore();
  const navigation = useNavigation();
  const { Fetch, loading } = useFetch();
  const [email, setEmail] = useState(user.current_user?.email ?? "");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    user.checkLoggedIn();
  }, []);
  const handleForgotPassword = async () => {
    if (loading) return;
    const obj = { email };
    const data = await Fetch({
      url: postUrl,
      method: "POST",
      body: obj,
    });
    if (data.error) {
      setRegisterError(data.error.message || data.error.details.message);
    }
  };
  return (
    <Card padding>
      <Input
        label={LABELS.EMAIL}
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputMode="email"
      ></Input>
      <Button
        label={LABELS.FORGOT_PASSWORD}
        onPress={handleForgotPassword}
        disabled={!email}
      ></Button>
      <Button
        label={LABELS.TERUG}
        type="secondary"
        onPress={() => navigation.goBack()}
      ></Button>
      {registerError && (
        <PopUp
          title={registerError}
          visible={!!registerError}
          message={registerError}
          onDismiss={() => {
            setRegisterError("");
          }}
        ></PopUp>
      )}
    </Card>
  );
}

export default observer(ForgotPassword);
