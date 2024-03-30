import { action, makeAutoObservable } from "mobx";
import URLS from "../constants/Host";
import { LABELS } from "../constants/Labels";
import { IIngredientState, IProduct } from "../types/schemas.types";
import { Store } from "./index.store";

export class ProductStore {
  [key: string]: unknown;
  store: Store;
  scannedProduct: IProduct;
  scanned: boolean;
  barcode: string;
  selectedIngredient: IIngredientState;

  constructor(rootStore: Store) {
    this.store = rootStore;
    this.scanned = false;
    this.scannedProduct = null;
    this.barcode = null;
    this.selectedIngredient = null;
    makeAutoObservable(this);
  }

  get current_scannedProduct() {
    return this.scannedProduct;
  }

  get current_selectedIngredient() {
    return this.selectedIngredient;
  }

  get current_barcode() {
    return this.barcode;
  }

  get filtered_ingredients() {
    return this.scannedProduct.ingredients?.data
      ?.filter((ingredient) => {
        const { id, attributes } = ingredient.attributes.ingredient_state?.data;
        return (
          id &&
          (attributes.schoolOfThought?.includes(
            this.store.user.current_user.schoolOfThought,
          ) ||
            attributes.consensus)
        );
      })
      .map((current_ingredient) => ({
        ...current_ingredient.attributes.ingredient_state?.data.attributes,
        ingredientName: current_ingredient.attributes.title,
      }));
  }

  fetchProductByProductName = action(async (productId: number) => {
    if (productId == null) return;
    const url = `${URLS.HOST}${URLS.PRODUCTS}/${productId.toString()}?${URLS.POPULATE_INGREDIENTS}`;
    try {
      const res = await fetch(url);
      const data1 = await res.json();
      const data = JSON.parse(JSON.stringify(data1));
      const productFormat = { id: productId, ...data.data.attributes };
      return productFormat;
    } catch (e) {
      console.log(e);
    }
  });

  get haram_ingredients_list() {
    return this.filtered_ingredients?.filter(
      (ingredient) => ingredient.haram === true,
    );
  }

  get doubtful_ingredients_list() {
    return this.filtered_ingredients?.filter((ingredient) => !ingredient.haram);
  }

  get has_alcohol() {
    return this.haram_ingredients_list?.some(
      (ingredient) => ingredient.title === "alcohol",
    );
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

  getProductStatus = action(() => {
    const halalRegex = /h[ea]laa?l/i;
    const containsHalalWord =
      halalRegex.test(this.current_scannedProduct.allIngredients) ||
      halalRegex.test(this.current_scannedProduct.productName);
    if (containsHalalWord) return LABELS.HALAL;
    // if vegan return halal, except if alcohol is present
    if (this.has_alcohol) return LABELS.HARAM;
    if (this.current_scannedProduct?.vegan && !this.has_alcohol) {
      return LABELS.VEGAN;
    }
    for (const haramIngredient of this.haram_ingredients_list) {
      if (
        haramIngredient.schoolOfThought?.includes(
          this.store.user.current_user.schoolOfThought,
        ) ||
        haramIngredient.consensus === true
      ) {
        return LABELS.HARAM;
      }
    }
    for (const doubtfulIngredient of this.doubtful_ingredients_list) {
      if (
        doubtfulIngredient.schoolOfThought?.includes(
          this.store.user.current_user.schoolOfThought,
        ) ||
        doubtfulIngredient.consensus === true
      ) {
        return LABELS.HARAM_DOOR_ONBEKENDE_OORSPRONG;
      }
    }
    return LABELS.HALAL;
  });

  private set = action((attribute: string, value: any) => {
    if (this[attribute] === value) return;
    this[attribute] = value;
  });
}
