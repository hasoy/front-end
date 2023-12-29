import { action, makeAutoObservable } from "mobx";
import { IIngredientState, IProduct } from "../types/schemas.types";
import { Store } from "./index.store";
import { haramProduct, doubtfulProduct } from "./testProduct";

export class ProductStore {
  [key: string]: unknown;
  store: Store;
  scannedProduct: IProduct | null = null;
  scanned: boolean;
  barcode: string | null = null;
  selectedIngredient: IIngredientState | null;

  constructor(rootStore: Store) {
    this.store = rootStore;
    this.scanned = false;
    // TODO remove if not dev
    // this.scannedProduct = null;
    this.scannedProduct = haramProduct;
    this.barcode = null;
    this.selectedIngredient = null;
    makeAutoObservable(this);
  }

  get current_scannedProduct() {
    return this.scannedProduct;
  }

  get current_scanned() {
    return this.scanned;
  }

  get current_new_product() {
    return this.newProduct;
  }

  get current_selectedIngredient() {
    return this.selectedIngredient;
  }

  get current_barcode() {
    return this.barcode;
  }

  setScannedProduct = action((scannedProduct: IProduct | null) => {
    this.set("scannedProduct", scannedProduct);
  });

  setScanned = action((scanned: boolean) => {
    this.set("scanned", scanned);
  });

  setBarcode = action((barcode: string | null) => {
    this.set("barcode", barcode);
  });

  setSelectedIngredient = action((ingredient: IIngredientState) => {
    this.set("selectedIngredient", ingredient);
  });

  private set = action((attribute: string, value: any) => {
    if (this[attribute] === value) return;
    this[attribute] = value;
  });
}
