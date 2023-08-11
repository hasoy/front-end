export type IIngredient = {
  attributes: {
    name: string;
    products: number[];
    status: IIngredientStatus;
    source?: "plant" | "syntetic" | "animal";
    explanation?: string;
    id?: number;
  };
};

export type IIngredientStatus = "haram" | "unknown" | "halal" | "doubtful";

export type IProductVerification = {
  verifiedBy?: string;
  oldValue?: string;
  newValue?: string;
  explanation?: string;
};

export type IProduct = {
  barcode: string;
  productName: string;
  ingredients?: { data: IIngredient[] };
  category?: string;
  land?: string;
  explanation?: string;
  store?: string;
  allIngredients?: string;
  scannedAmount?: number;
  productVerifications?: IProductVerification[];
};

export type IReportReason =
  | "duplicate"
  | "haram"
  | "halal"
  | "ingredientMissing"
  | "doubtful"
  | "incorrectName";
