/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabScanner: {
            screens: {
              TabScanner: "TabScanner",
            },
          },
          TabProductDetails: {
            screens: {
              TabProductDetails: "TabProductDetails",
            },
          },
          ReportProduct: {
            screens: {
              ReportProduct: "ReportProduct",
            },
          },
          TabProfile: {
            screens: {
              TabProfile: "TabProfile",
            },
          },
          AddProduct: {
            screens: {
              AddProduct: "AddProduct",
            },
          },
          LoginView: {
            screens: {
              LoginView: "Inloggen",
            },
          },
          RegisterView: {
            screens: {
              RegisterView: "Registeren",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
