/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  AddProduct,
  LoginView,
  ModalScreen,
  NotFoundScreen,
  RegisterView,
  ReportProduct,
  TabProductDetails,
  TabProfile,
  TabScanner,
  ResetPassword,
  ForgotPassword,
} from "../screens";
import { PATHS } from "../constants/paths";
import ContactPage from "../screens/ContactPage";

function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user } = useStore();
  useEffect(() => {
    user.checkLoggedIn();
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {/* uncomment for auth (also revisit user.store) */}
      {/* {user.current_user?.jwt ? <RootNavigator /> : <AuthStack />} */}
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

// uncomment for auth/logging in(missing forgot/reset password)
// function AuthStack() {
//   return (
//     <Stack.Navigator initialRouteName={PATHS.LOGIN}>
//       <Stack.Screen name={PATHS.LOGIN} options={{ title: "Inloggen" }} component={LoginView} />
//       <Stack.Screen
//         name={PATHS.REGISTER}
//         options={{ title: "Registeren" }}
//         component={RegisterView}
//       />
//       <Stack.Screen
//         name={PATHS.FORGOT_PASSWORD}
//         options={{ title: "Wachtwoord vergeten" }}
//         component={ForgotPassword}
//       />
//       <Stack.Screen
//         name={PATHS.RESET_PASSWORD}
//         options={{ title: "Wachtwoord resetten" }}
//         component={ResetPassword}
//       />
//     </Stack.Navigator>
//   );
// }

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen
        name={PATHS.PRODUCT_DETAILS}
        options={{ title: "Product details" }}
        component={TabProductDetails}
      />
      <Stack.Screen
        name={PATHS.SCANNER}
        options={{ title: "Barcode scanner" }}
        component={TabScanner}
      />
      {/* <Stack.Screen name={PATHS.PROFILE} options={{ title: "Profiel" }} component={TabProfile} /> */}
      <Stack.Screen
        name={PATHS.REPORT_PRODUCT}
        options={{ title: "Product fout melden" }}
        component={ReportProduct}
      />
      <Stack.Screen
        name={PATHS.ADD_PRODUCT}
        options={{ title: "Product toevoegen" }}
        component={AddProduct}
      />
      <Stack.Screen name={PATHS.CONTACT} options={{ title: "Contact" }} component={ContactPage} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabScanner"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name={PATHS.SCANNER}
        component={TabScanner}
        options={{
          title: "Barcode scanner",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="barcode" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={PATHS.PRODUCT_DETAILS}
        component={TabProductDetails}
        options={{
          title: "Product details",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="sitemap" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={PATHS.CONTACT}
        component={ContactPage}
        options={{
          title: "Contact",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="TabProfile"
        component={TabProfile}
        options={{
          title: "Profiel",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default observer(Navigation);
