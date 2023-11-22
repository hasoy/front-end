import { observer } from "mobx-react-lite";
import { URLS } from "../constants/Host";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks/useStore";
import LoginPage from "../components/LoginPage";

const host = URLS.HOST;
const postUrl = `${host}/api/auth/local`;

function LoginView() {
  const { user } = useStore();
  if (user.current_jwt) {
    return;
  }
  const [email, setEmail] = useState(user.current_user?.email ?? "");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await response.json();
      if (data.error) {
        setRegisterError(data.error.message || data.error.details.message);
      }
      if (data.jwt) {
        user.setJwt(data.jwt);
        user.setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = async () => {
    navigation.navigate("Registeren");
  };
  return (
    <LoginPage
      setEmail={setEmail}
      setPassword={setPassword}
      setRegisterError={setRegisterError}
      registerError={registerError}
      primaryButtonLabel="Inloggen"
      primaryButtonOnPress={handleLogin}
      secondaryButtonLabel="Registeren"
      secondaryButtonOnPress={handleRegister}
      screenTitle="Inloggen"
      email={email}
      password={password}
    ></LoginPage>
  );
}

export default observer(LoginView);
