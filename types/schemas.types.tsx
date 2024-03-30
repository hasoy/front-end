export interface IScan {
  scan?: number;
  product: number;
}

export interface IIngredientDetails {
  title?: string;
  ingredient_state: { data: { id: number; attributes: IIngredientState } };
  id?: number;
}

export interface IIngredientState {
  consensus?: boolean;
  explanation?: string;
  schoolOfThought?: string[];
  title?: string;
  name?: string;
  id?: number;
  istihala?: boolean;
  istihlaak?: boolean;
  haram?: boolean;
}
interface IStatusResponse {
  current_ingredient: string;
  pattern: {
    explanation: string;
    title: String;
    consensus?: boolean;
    haram?: boolean;
    schoolOfThought?: string[];
  };
}

export interface IIngredient {
  attributes: IIngredientDetails;
  id: number;
}

export type IProduct = {
  productName: string;
  ingredients?: { data: IIngredient[] };
  land?: string;
  store?: string;
  allIngredients?: string;
  // TODO fix reportedProducts
  // reportedProducts?:IReportedProduct[]
  weight?: string;
  barcode: string;
  vegan?: boolean;
  scans?: IScan[];
  category?: string;
  allergens?: string[];
  lifestyle?: string[];
  contact?: IContact;
  explanation?: string;
  id?: number;
};
interface IContact {
  name?: string[];
  address?: string[];
}

export type IReportReason =
  | "duplicate"
  | "haram"
  | "halal"
  | "ingredientMissing"
  | "doubtful"
  | "incorrectName";
