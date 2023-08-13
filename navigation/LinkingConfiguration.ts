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
          TabIngredient: {
            screens: {
              TabIngredient: "TabIngredient",
            },
          },
          ReportProduct: {
            screens: {
              ReportProduct: "ReportProduct",
            },
          },
          AddProduct: {
            screens: {
              ReportProduct: "AddProduct",
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
