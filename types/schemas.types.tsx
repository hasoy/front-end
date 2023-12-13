export interface IScan {
  scan?: number;
  product: number;
}

export interface IIngredientState {
  consensus?: boolean;
  explanation?: string;
  schoolOfThought?: string[];
  title?: string;
  ingredientName?: string;
  id?: number;
}

interface IIngredientComponent {
  id: number;
  attributes: {
    ingredientState: IIngredientState;
  };
}
export interface IIngredientStatus {
  attributes: {
    title: string;
    doubtful_ingredient: {
      data: IIngredientComponent | null;
    };
    haram_ingredient: {
      data: IIngredientComponent | null;
    };
  };
}

export type IProduct = {
  productName: string;
  ingredients?: { data: IIngredientStatus[] };
  land?: string;
  store?: string;
  allIngredients?: string;
  // fix reportedProducts
  // reportedProducts?:IReportedProduct[]
  weight?: string;
  barcode: string;
  vegan?: boolean;
  scans?: IScan[];
  category?: string;
  allergens?: string[];
  lifestyle?: string[];
  // fix contact
  contact?: string[];
  explanation?: string;
  id?: number;
};

export type IReportReason =
  | "duplicate"
  | "haram"
  | "halal"
  | "ingredientMissing"
  | "doubtful"
  | "incorrectName";
