import { action, makeAutoObservable } from "mobx";
import { IIngredient } from "../types/schemas.types";
import { Store } from "./index.store";

type ISchoolOfThought = "maliki" | "shafi" | "hanafi" | "hanbali" | "salafi";

interface IUser {
  email: string;
  username: string;
  createdAt: string;
  schoolOfThought: ISchoolOfThought;
  id: number;
}

const testUser: IUser = {
  email: "test@test.com",
  username: "test",
  createdAt: "123",
  schoolOfThought: "maliki",
  id: 5,
};

const testJwt = "test";

export class UserStore {
  [key: string]: unknown;
  store: Store;
  selectedIngredient: IIngredient | null;
  jwt: string;
  user: IUser;

  constructor(rootStore: Store) {
    this.store = rootStore;
    // TODO remove if not dev
    this.jwt = testJwt;
    this.user = testUser;
    makeAutoObservable(this);
  }

  get current_jwt() {
    return this.jwt;
  }

  get current_user() {
    return this.user;
  }

  setJwt = action((value: string) => {
    this.set("jwt", value);
  });

  setUser = action((value: { email: string; username: string; createdAt: string }) => {
    this.set("user", value);
  });

  private set = action((attribute: string, value: any) => {
    if (this[attribute] === value) return;
    this[attribute] = value;
  });
}
