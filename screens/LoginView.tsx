import { observer } from "mobx-react-lite";
import URLS from "../constants/Host";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks/useStore";
import LoginPage from "../components/LoginPage";
import { LABELS } from "../constants/Labels";
import { useFetch } from "../hooks/useFetch";
import { PATHS } from "../constants/paths";

const host = URLS.HOST;
const postUrl = `${host}${URLS.LOGIN}`;

function LoginView() {
  const { user } = useStore();
  const navigation = useNavigation();
  const { Fetch, loading } = useFetch();
  const [email, setEmail] = useState(user.current_user?.email ?? "");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    user.checkLoggedIn();
  }, []);
  const handleLogin = async () => {
    if (loading) return;
    const obj = { identifier: email, password };
    const data = await Fetch({
      url: postUrl,
      method: "POST",
      body: obj,
    });
    if (data.error) {
      setRegisterError(data.error.message || data.error.details.message);
    }
    if (data.jwt) {
      user.setUser({ ...data.user, jwt: data.jwt });
    }
  };
  const handleRegister = async () => {
    navigation.navigate(PATHS.REGISTER);
  };
  return (
    <LoginPage
      setEmail={setEmail}
      setPassword={setPassword}
      setRegisterError={setRegisterError}
      registerError={registerError}
      primaryButtonLabel={LABELS.LOG_IN}
      primaryButtonOnPress={handleLogin}
      secondaryButtonLabel={LABELS.REGISTREREN}
      secondaryButtonOnPress={handleRegister}
      screenTitle={LABELS.LOG_IN}
      email={email}
      password={password}
      loading={loading}
      forgotPassword
    ></LoginPage>
  );
}

export default observer(LoginView);
