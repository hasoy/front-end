import { IProduct } from "../../front-end/types/schemas.types";

export const haramProduct: IProduct = {
  barcode: "4065019000249",
  id: 3114,
  productName: "haram product but vegan",
  land: null,
  store: null,
  allIngredients:
    "Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod.",
  scannedAmount: null,
  weight: null,
  vegan: true,
  category: null,
  allergens: null,
  lifestyle: null,
  contact: null,
  ingredients: {
    data: [
      {
        id: 10142,
        attributes: {
          title: "twijfelachtig ingredient",
          doubtful_ingredient: {
            data: {
              id: 19,
              attributes: {
                ingredientState: {
                  id: 44,
                  title: "dierlijk",
                  explanation: "bevat dier of dierlijke ingredient",
                  schoolOfThought: null,
                  consensus: true,
                },
              },
            },
          },
          haram_ingredient: {
            data: null,
          },
        },
      },
      {
        id: 10143,
        attributes: {
          title: "garnaal smaak",
          haram_ingredient: {
            data: {
              id: 20,
              attributes: {
                ingredientState: {
                  id: 45,
                  title: "garnaal",
                  explanation: "bevat garnaal",
                  schoolOfThought: ["hanafi"],
                  consensus: null,
                },
              },
            },
          },
          doubtful_ingredient: {
            data: null,
          },
        },
      },
      {
        id: 10144,
        attributes: {
          title: "haram ingredient 2",
          doubtful_ingredient: {
            data: null,
          },
          haram_ingredient: {
            data: {
              id: 56,
              attributes: {
                ingredientState: {
                  id: 42,
                  title: "e120",
                  explanation: "E120 wordt uit insecten gewonnen",
                  schoolOfThought: ["hanafi"],
                  consensus: false,
                },
              },
            },
          },
        },
      },
      {
        id: 10145,
        attributes: {
          title: "alcohol",
          doubtful_ingredient: {
            data: null,
          },
          haram_ingredient: {
            data: {
              id: 57,
              attributes: {
                ingredientState: {
                  id: 42,
                  title: "alcohol",
                  explanation: "alcohol",
                  consensus: true,
                },
              },
            },
          },
        },
      },
    ],
  },
};

export const doubtfulProduct: IProduct = {
  barcode: "4065019000249",
  id: 3114,
  productName: "doubtful product",
  land: null,
  store: null,
  allIngredients:
    "Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod.",
  scannedAmount: null,
  weight: null,
  vegan: null,
  category: null,
  allergens: null,
  lifestyle: null,
  contact: null,
  ingredients: {
    data: [
      {
        id: 10142,
        attributes: {
          title: "twijfelachtig ingredient",
          doubtful_ingredient: {
            data: {
              id: 19,
              attributes: {
                ingredientState: {
                  id: 44,
                  title: "dierlijk",
                  explanation: "bevat dier of dierlijke ingredient",
                  schoolOfThought: null,
                  consensus: true,
                },
              },
            },
          },
          haram_ingredient: {
            data: null,
          },
        },
      },
    ],
  },
};
