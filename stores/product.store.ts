import { action, makeAutoObservable } from "mobx";
import { IIngredient, IProduct } from "../types/schemas.types";
import { Store } from "./index.store";
import { testProduct } from "./testProduct";

export class ProductStore {
  [key: string]: unknown;
  store: Store;
  scannedProduct: IProduct | null = null;
  productBarcode: string | null = null;
  selectedIngredient: IIngredient | null;

  constructor(rootStore: Store) {
    this.store = rootStore;
    this.scannedProduct = null;
    // this.scannedProduct = testProduct;
    this.selectedIngredient = null;
    makeAutoObservable(this);
  }

  get current_scannedProduct() {
    return this.scannedProduct;
  }

  get current_selectedIngredient() {
    return this.selectedIngredient;
  }

  setScannedProduct = action((scannedProduct: IProduct | null) => {
    this.set("scannedProduct", scannedProduct);
  });

  private set = action((attribute: string, value: any) => {
    if (this[attribute] === value) return;
    this[attribute] = value;
  });
}
