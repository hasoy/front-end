import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PaperProvider,
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { COLORS } from "./constants/Colors";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
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
