import { observer } from "mobx-react-lite";
import { Button, Card, Input, PopUp, Title } from "../components";

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
}: ILoginPage) {
  return (
    <Card padding>
      <Title label={screenTitle}></Title>
      <Input
        label={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputMode="email"
      ></Input>
      <Input
        label={"Password"}
        value={password}
        inputMode="text"
        onChangeText={(text) => setPassword(text)}
      ></Input>
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
