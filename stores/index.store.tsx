import { makeAutoObservable } from "mobx";
import { ProductStore } from "./product.store";
import { createContext } from "react";

export class Store {
  product: ProductStore;
  constructor() {
    this.product = new ProductStore(this);
    makeAutoObservable(this);
  }
}

export const StoreContext = createContext<Store>(new Store());
