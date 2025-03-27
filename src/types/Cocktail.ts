export interface CocktailAPI {
  readonly idDrink: string;
  readonly strDrink: string;
  readonly strCategory: string;
  readonly strGlass: string;
  readonly strInstructions: string;
  readonly strDrinkThumb: string;
  readonly strIngredient1: string;
  readonly strIngredient2: string;
  readonly strIngredient3: string;
  readonly strIngredient4: string;
  readonly strIngredient5: string;
  readonly strIngredient6: string;
  readonly strIngredient7: string;
  readonly strIngredient8: string;
  readonly strIngredient9: string;
  readonly strIngredient10: string;
  readonly strIngredient11: string;
  readonly strIngredient12: string;
  readonly strIngredient13: string;
  readonly strIngredient14: string;
  readonly strIngredient15: string;
  readonly strMeasure1: string;
  readonly strMeasure2: string;
  readonly strMeasure3: string;
  readonly strMeasure4: string;
  readonly strMeasure5: string;
  readonly strMeasure6: string;
  readonly strMeasure7: string;
  readonly strMeasure8: string;
  readonly strMeasure9: string;
  readonly strMeasure10: string;
  readonly strMeasure11: string;
  readonly strMeasure12: string;
  readonly strMeasure13: string;
  readonly strMeasure14: string;
  readonly strMeasure15: string;
}

interface Recipy {
  readonly ingredient: string;
  readonly measure: string;
}

export interface Cocktail {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly glass: string;
  readonly instructions: string;
  readonly image?: string;
  readonly recipy: ReadonlyArray<Recipy>;
}

const sortByNumberInStr = (a: string, b: string) =>
  parseInt(a.replace(/^\D+/g, "")) - parseInt(b.replace(/^\D+/g, ""));

const toRecipy = (c: CocktailAPI): ReadonlyArray<Recipy> => {
  const keysIngredient: ReadonlyArray<keyof CocktailAPI> = Object.keys(c)
    .filter((key): key is keyof CocktailAPI => key.startsWith("strIngredient"))
    .sort(sortByNumberInStr);

  const keysMesure: ReadonlyArray<keyof CocktailAPI> = Object.keys(c)
    .filter((key): key is keyof CocktailAPI => key.startsWith("strMeasure"))
    .sort(sortByNumberInStr);

  if (keysIngredient.length !== keysMesure.length) return [];

  return keysIngredient.map((ingredient, i) => ({
    ingredient: c[ingredient],
    measure: c[keysMesure[i]],
  }));
};

export const from = (c: CocktailAPI): Cocktail => ({
  recipy: toRecipy(c),
  image: c.strDrinkThumb,
  category: c.strCategory,
  glass: c.strGlass,
  instructions: c.strInstructions,
  id: c.idDrink,
  name: c.strDrink,
});

export const is = (param: any): param is Cocktail =>
  typeof param === "object" &&
  param !== null &&
  typeof param.id === "string" &&
  typeof param.category === "string" &&
  typeof param.glass === "string" &&
  typeof param.instructions === "string" &&
  typeof param.image === "string" &&
  typeof param.name === "string" &&
  Array.isArray(param.recipy) &&
  param.recipy.every(
    (item: any) =>
      typeof item.ingredient === "string" && typeof item.measure === "string"
  );
