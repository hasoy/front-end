import URLS from "../constants/Host";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import LoginPage from "../components/LoginPage";
import { LABELS } from "../constants/Labels";
import { useFetch } from "../hooks/useFetch";

const host = URLS.HOST;
const postUrl = `${host}/api/auth/local/register`;

function RegisterView() {
  const { user } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigation = useNavigation();
  const { Fetch, loading } = useFetch();

  const handleRegister = async () => {
    const response = await Fetch({
      url: postUrl,
      method: "POST",
      body: { username: email, email, password, schoolOfThought: null },
    });
    if (response?.jwt) {
      user.setUser({ ...response.user, jwt: response.jwt });
    }
    if (response.error) setRegisterError(response?.error?.message);
  };
  return (
    <LoginPage
      setEmail={setEmail}
      setPassword={setPassword}
      setRegisterError={setRegisterError}
      registerError={registerError}
      primaryButtonLabel={LABELS.REGISTREREN}
      primaryButtonOnPress={handleRegister}
      secondaryButtonLabel={LABELS.TERUG}
      secondaryButtonOnPress={navigation.goBack}
      screenTitle={LABELS.REGISTREREN}
      email={email}
      password={password}
      loading={loading}
    ></LoginPage>
  );
}

export default observer(RegisterView);
