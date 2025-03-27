import axios from "axios";
import { CocktailItem } from "../../components/CocktailItem";
import { GridChildComponentProps } from "react-window";
import * as Cocktail from "../../types/Cocktail";
import { QueryClient } from "@tanstack/react-query";
import { getDataFromStorage } from "../../utils/LocalStorage";

interface CocktailsData {
  readonly drinks: ReadonlyArray<Cocktail.CocktailAPI>;
}

interface Data {
  readonly items: ReadonlyArray<Cocktail.Cocktail>;
  readonly nextCursor?: string;
}

interface QueryData {
  readonly pages: ReadonlyArray<Data>;
  readonly pageParams: ReadonlyArray<string>;
}

export const rowHeight = 400;
export const columnWidth = 300;
export const initialPageParam = "a";
export const queryKey = ["drinks"];

export const fetchByName = (term: string) => {
  const searchTerm = term.toLowerCase();
  const savedItems = getDataFromStorage("drinks", Cocktail.is).filter(
    (cocktail) => cocktail.name.toLowerCase() === searchTerm
  );

  return axios
    .get<CocktailsData>(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    )
    .then(({ data }) => {
      const { drinks } = data;
      return [
        ...savedItems,
        ...(Array.isArray(drinks) ? drinks : []).map(Cocktail.from),
      ];
    });
};

export const fetch = ({
  pageParam = "a",
}: {
  readonly pageParam: string;
}): Promise<Data> =>
  axios
    .get<CocktailsData>(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${pageParam}`
    )
    .then((data) => ({
      items: [
        ...(pageParam === "a" ? getDataFromStorage("drinks", Cocktail.is) : []),
        ...data.data.drinks.map(Cocktail.from),
      ],
      nextCursor:
        pageParam === "z"
          ? undefined
          : String.fromCharCode(pageParam.charCodeAt(0) + 1),
    }));

export const save = (queryClient: QueryClient) => (item: Cocktail.Cocktail) => {
  const items = getDataFromStorage("drinks", Cocktail.is);
  window.localStorage.setItem("drinks", JSON.stringify([item, ...items]));
  queryClient.setQueryData(queryKey, (prevData: QueryData): QueryData => {
    const [fstPage, ...restPages] = prevData.pages;
    return {
      pageParams: prevData.pageParams,
      pages: [
        {
          items: [item, ...fstPage.items],
          nextCursor: fstPage.nextCursor,
        },
        ...restPages,
      ],
    };
  });
};

export const renderItem =
  (
    columnCount: number,
    isItemLoaded: (index: number) => boolean,
    items: ReadonlyArray<Cocktail.Cocktail & { readonly onClick: () => void }>
  ) =>
  ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * columnCount + columnIndex;

    if (isItemLoaded(index)) {
      return (
        <div style={style} onClick={items[index].onClick}>
          <CocktailItem {...items[index]} />
        </div>
      );
    } else {
      return null;
    }
  };
