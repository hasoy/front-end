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
const postUrl = `${host}/api/auth/local`;

function ResetPassword() {
  const { user } = useStore();
  const navigation = useNavigation();
  const [email, setEmail] = useState(user.current_user?.email ?? "");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {}, []);
  const handleLogin = async () => {};
  const handleRegister = async () => {};
  return <li></li>;
}

export default observer(ResetPassword);
