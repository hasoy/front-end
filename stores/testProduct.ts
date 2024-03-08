import { IProduct } from "../../front-end/types/schemas.types";

export const haramProduct: IProduct = {
  barcode: "08722200962842",
  productName: "Test product",
  land: "Netherlands",
  store: "Albert Heijn",
  allIngredients:
    "Ingrediënten: water, pinda, alcohol, suiker, maltodextrine, voedingszuur: citroenzuur, natriumchloride, zuurteregelaars: magnesiumlactaat, natriumcitraat, kaliumfosfaat en calciumfosfaat, conserveermiddel: E202, vitamines: B3, E, B5, B6 en H, stabilisatoren: arabische gom en glycerol-esters van houthars, natuurlijke aroma’s. Osmolaliteit 290-320 mOsm/L",
  weight: "500 Milliliter",
  vegan: false,
  category: "Frisdrank, sappen, koffie, thee/Sportdrank flesjes",
  allergens: null,
  lifestyle: [
    "zonder_melk",
    "zonder_kreeftachtigen",
    "zonder_soja",
    "zonder_vis",
    "dieet_vegetarisch",
    "zonder_lupine",
    "zonder_pindas",
    "zonder_mosterd",
    "zonder_lactose",
    "zonder_sulfiet",
    "dieet_veganistisch",
    "zonder_sesam",
    "dieet_laag_vet",
    "dieet_laag_zout",
    "zonder_schelpdieren",
    "zonder_eieren",
    "zonder_noten",
    "zonder_selderij",
    "zonder_gluten",
  ],
  contact: {
    name: ["United Soft Drinks BV"],
    address: ["Antwoordnummer 3333, NL 3500 VP Utrecht,", "Holland/The Netherlands"],
  },
  ingredients: {
    data: [
      {
        id: 1234,
        attributes: {
          title: "gelatine",
          ingredient_state: {
            data: {
              id: 551,
              attributes: {
                title: "gelatine",
                consensus: true,
                istihlaak: false,
                istihala: false,
                haram: true,
                explanation: "Gelatine",
                schoolOfThought: [],
              },
            },
          },
        },
      },
      {
        id: 1234,
        attributes: {
          title: "Alcohol",
          ingredient_state: {
            data: {
              id: 551,
              attributes: {
                title: "alcohol",
                consensus: true,
                istihlaak: false,
                istihala: false,
                haram: true,
                explanation: "Alcohol",
                schoolOfThought: [],
              },
            },
          },
        },
      },
      {
        id: 12252,
        attributes: {
          title: "E422",
          ingredient_state: {
            data: {
              id: 884,
              attributes: {
                title: "E422",
                consensus: true,
                istihlaak: false,
                istihala: true,
                haram: false,
                explanation:
                  "Bevochtigingsmiddel en verdikkingsmiddel. Komt van nature voor als bestanddeel van dierlijke en plantaardige vetten en oliën en komt ook in ons lichaam voor. Het wordt gewonnen uit vetten en oliën, kunstmatig gemaakt door stoffen te bewerken of met behulp van een bacterie uit suikers. Het wordt gebruikt om producten te beschermen tegen uitdrogen of steviger te maken. Het kan ook gebruikt worden in biologische plantenextracten. Het kan gemaakt zijn door bewerking van dierlijke vetten. Hierdoor is het in sommige gevallen niet geschikt voor veganisten, vegetariërs en sommige religies.",
                schoolOfThought: ["shafi", "hanbali"],
              },
            },
          },
        },
      },
    ],
  },
};

export const doubtfulProduct: IProduct = {
  barcode: "08722200962842",
  productName: "AA Drink Iso lemon",
  land: "Netherlands",
  store: "Albert Heijn",
  allIngredients:
    "Ingrediënten: Water, suiker, maltodextrine, voedingszuur: citroenzuur, natriumchloride, zuurteregelaars: magnesiumlactaat, natriumcitraat, kaliumfosfaat en calciumfosfaat, conserveermiddel: E202, vitamines: B3, E, B5, B6 en H, stabilisatoren: arabische gom en glycerol-esters van houthars, natuurlijke aroma’s. Osmolaliteit 290-320 mOsm/L",
  weight: "500 Milliliter",
  vegan: true,
  category: "Frisdrank, sappen, koffie, thee/Sportdrank flesjes",
  allergens: null,
  lifestyle: [
    "zonder_melk",
    "zonder_kreeftachtigen",
    "zonder_soja",
    "zonder_vis",
    "dieet_vegetarisch",
    "zonder_lupine",
    "zonder_pindas",
    "zonder_mosterd",
    "zonder_lactose",
    "zonder_sulfiet",
    "dieet_veganistisch",
    "zonder_sesam",
    "dieet_laag_vet",
    "dieet_laag_zout",
    "zonder_schelpdieren",
    "zonder_eieren",
    "zonder_noten",
    "zonder_selderij",
    "zonder_gluten",
  ],
  contact: {
    name: ["United Soft Drinks BV"],
    address: ["Antwoordnummer 3333, NL 3500 VP Utrecht,", "Holland/The Netherlands"],
  },
  ingredients: {
    data: [
      {
        id: 12252,
        attributes: {
          title: "arabische gom en glycerol-esters van houthars",
          ingredient_state: {
            data: {
              id: 884,
              attributes: {
                title: "E422",
                consensus: false,
                istihlaak: false,
                istihala: true,
                haram: null,
                explanation:
                  "Bevochtigingsmiddel en verdikkingsmiddel. Komt van nature voor als bestanddeel van dierlijke en plantaardige vetten en oliën en komt ook in ons lichaam voor. Het wordt gewonnen uit vetten en oliën, kunstmatig gemaakt door stoffen te bewerken of met behulp van een bacterie uit suikers. Het wordt gebruikt om producten te beschermen tegen uitdrogen of steviger te maken. Het kan ook gebruikt worden in biologische plantenextracten. Het kan gemaakt zijn door bewerking van dierlijke vetten. Hierdoor is het in sommige gevallen niet geschikt voor veganisten, vegetariërs en sommige religies.",
                schoolOfThought: ["shafi", "hanbali"],
              },
            },
          },
        },
      },
    ],
  },
};
