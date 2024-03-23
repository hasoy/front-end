import { action, makeAutoObservable } from "mobx";
import { Store } from "./index.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ISchoolOfThought =
  | "maliki"
  | "shafi"
  | "hanafi"
  | "hanbali"
  | "default";

interface IUser {
  // email: string;
  // username: string;
  // createdAt?: string;
  schoolOfThought?: ISchoolOfThought;
  // id: number;
  // jwt?: string;
  // allergies?: string[];
  // customAllergies?: string[];
}

export class UserStore {
  [key: string]: unknown;
  store: Store;
  user: IUser;
  // jwt: string;

  constructor(rootStore: Store) {
    this.store = rootStore;
    // this.user = { allergies: [], customAllergies: [] };
    this.user = { schoolOfThought: null };
    makeAutoObservable(this);
  }

  get current_user() {
    return JSON.parse(JSON.stringify({ ...this.user }));
  }

  // get custom_allergies() {
  //   return this.user.customAllergies;
  // }

  setUser = action(async (value: IUser) => {
    this.set("user", value);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("logged-in-user", jsonValue);
    } catch (e) {
      console.error(e, "error saving user");
      return null;
    }
  });

  checkLoggedIn = action(async () => {
    try {
      const jsonValue = await AsyncStorage?.getItem("logged-in-user");
      this.setUser(JSON.parse(jsonValue));
    } catch (e) {
      console.error(e, "error retrieving user from storage");
      return null;
    }
  });

  logOut = action(async () => {
    this.setUser(null);
  });

  private set = action((attribute: string, value: any) => {
    if (this[attribute] === value) return;
    this[attribute] = value;
  });
}
