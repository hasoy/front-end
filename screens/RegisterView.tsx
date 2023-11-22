import { URLS } from "../constants/Host";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import LoginPage from "../components/LoginPage";

const host = URLS.HOST;
const postUrl = `${host}/api/auth/local/register`;

function RegisterView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigation = useNavigation();

  const { user } = useStore();
  const handleRegister = async () => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, email, password }),
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        setRegisterError(data.error.message || data.error.details.message);
        return;
      }
      if (data.jwt) {
        user.setJwt(data.jwt);
        user.setUser(data.user);
      }
    } catch (error) {
      // console.error(error);
      // setRegisterError(error.error.message);
    }
  };
  return (
    <LoginPage
      setEmail={setEmail}
      setPassword={setPassword}
      setRegisterError={setRegisterError}
      registerError={registerError}
      primaryButtonLabel="Registeren"
      primaryButtonOnPress={handleRegister}
      secondaryButtonLabel="Terug"
      secondaryButtonOnPress={navigation.goBack}
      screenTitle="Inloggen"
      email={email}
      password={password}
    ></LoginPage>
  );
}

export default observer(RegisterView);
