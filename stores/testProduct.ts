import { IProduct } from "../../front-end/types/schemas.types";

export const testProduct: IProduct = {
  barcode: "1234567890",
  productName: "test product",
  category: "food",
  land: "nl",
  explanation:
    "<p>Volle romige aardappelsalade met aardappelschijfjes</p><p><ul><li>Met knapperige stukjes ui</li><li>Ook heerlijk als lunch of voorgerecht</li><li>Een must bij een goede BBQ of Gourmet</li><li>Vegetarisch</li><li>Prijsfavorieten: topkwaliteit en altijd laaggeprijsd</li></ul></p>",
  store: "albert heijn",
  scannedAmount: 5,
  allIngredients:
    "64% aardappel, water, raapolie, ui, suiker, azijn, vrije-uitloopeigeel, zout, maïszetmeel, gemodificeerd maïszetmeel, voedingszuur (melkzuur [E270]), conserveermiddel (kaliumsorbaat [E202], natriumbenzoaat [E211]), specerijen (o.a. mosterd), verdikkingsmiddel (guarpitmeel [E412], xanthaangom [E415]), limoensapconcentraat, peterselie, extract (wortel, peper), knoflook, natuurlijke aromas. Waarvan toegevoegde suikers 3.0g per 100 gram en waarvan toegevoegd zout 1.03g per 100 gram",
  ingredients: {
    data: [
      {
        attributes: {
          name: "Vanilla Extract",
          products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          status: "halal",
          source: "plant",
          explanation:
            "Derived from the vanilla bean, which is a plant source commonly used in food and beverages.",
          id: 12345,
        },
      },
      {
        attributes: {
          name: "Vanilla Extract",
          products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          status: "halal",
          source: "plant",
          explanation:
            "Derived from the vanilla bean, which is a plant source commonly used in food and beverages.",
          id: 12345,
        },
      },
      {
        attributes: {
          name: "Vanilla Extract",
          products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          status: "halal",
          source: "plant",
          explanation:
            "Derived from the vanilla bean, which is a plant source commonly used in food and beverages.",
          id: 12345,
        },
      },
      {
        attributes: {
          name: "Vanilla Extract",
          products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          status: "halal",
          source: "plant",
          explanation:
            "Derived from the vanilla bean, which is a plant source commonly used in food and beverages.",
          id: 12345,
        },
      },
      {
        attributes: {
          name: "Gelatin",
          products: [11, 12, 13, 14, 15],
          status: "doubtful",
          source: "animal",
          explanation:
            "Derived from the collagen in animal bones and connective tissue, but can also be made synthetically.",
          id: 67890,
        },
      },
      {
        attributes: {
          name: "Varkensvlees",
          products: [16, 17],
          status: "haram",
          source: "animal",
          explanation:
            "Derived from the collagen in animal bones and connective tissue, but can also be made synthetically.",
          id: 53453,
        },
      },
      {
        attributes: {
          name: "Varkensvlees",
          products: [16, 17],
          status: "haram",
          source: "animal",
          explanation:
            "Derived from the collagen in animal bones and connective tissue, but can also be made synthetically.",
          id: 53453,
        },
      },
      {
        attributes: {
          name: "Varkensvlees",
          products: [16, 17],
          status: "haram",
          source: "animal",
          explanation:
            "Derived from the collagen in animal bones and connective tissue, but can also be made synthetically.",
          id: 53453,
        },
      },
      {
        attributes: {
          name: "Varkensvlees",
          products: [16, 17],
          status: "haram",
          source: "animal",
          explanation:
            "Derived from the collagen in animal bones and connective tissue, but can also be made synthetically.",
          id: 53453,
        },
      },
    ],
  },
};
