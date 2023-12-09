import { observer } from "mobx-react-lite";
import Card from "./Card";
import { Title } from "./Title";
import Input from "./Input";
import Button from "./Button";
import PopUp from "./PopUp";
import { LABELS } from "../constants/Labels";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants/Colors";
import LinkText from "./LinkText";

interface ILoginPage {
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password?: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  registerError?: string;
  setRegisterError: React.Dispatch<React.SetStateAction<string>>;
  screenTitle?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonOnPress?: () => Promise<void> | void;
  secondaryButtonOnPress?: () => Promise<void> | void;
  loading?: boolean;
  forgotPassword?: boolean;
}

function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  registerError,
  setRegisterError,
  primaryButtonLabel,
  primaryButtonOnPress,
  secondaryButtonLabel,
  secondaryButtonOnPress,
  screenTitle,
  loading,
  forgotPassword,
}: ILoginPage) {
  return (
    <Card padding>
      <Title label={screenTitle}></Title>
      <Input
        label={LABELS.EMAIL}
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputMode="email"
      ></Input>
      <Input
        label={LABELS.PASSWORD}
        value={password}
        inputMode="text"
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        secureTextEntry={true}
      ></Input>
      {forgotPassword && (
        <LinkText label={LABELS.FORGOT_PASSWORD} to="wachtwoord-vergeten"></LinkText>
      )}
      <Button
        label={primaryButtonLabel}
        onPress={primaryButtonOnPress}
        disabled={!email || !password}
      ></Button>
      <Button
        label={secondaryButtonLabel}
        type="secondary"
        onPress={secondaryButtonOnPress}
      ></Button>
      {loading && <ActivityIndicator size={"large"} color={COLORS.GREEN} />}
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

export default observer(LoginPage);
