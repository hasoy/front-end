import { makeAutoObservable } from "mobx";
import { ProductStore } from "./product.store";
import { createContext } from "react";
import { UserStore } from "./user.store";

export class Store {
  product: ProductStore;
  user: UserStore;

  constructor() {
    this.product = new ProductStore(this);
    this.user = new UserStore(this);
    makeAutoObservable(this);
  }
}

export const StoreContext = createContext<Store>(new Store());
