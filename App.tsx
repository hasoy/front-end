import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "./constants/Colors";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { useStore } from "./hooks/useStore";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { user } = useStore();
  useEffect(() => {
    user.checkLoggedIn();
  }, []);
  const lightTheme = {
    ...LightTheme,
    colors: {
      ...LightTheme.colors,
      primary: COLORS.GREEN,
      secondary: COLORS.BLUE,
    },
  };
  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: COLORS.GREEN,
      secondary: COLORS.BLUE,
    },
  };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
