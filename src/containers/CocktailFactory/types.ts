import { Cocktail } from "../../types/Cocktail";

export interface FormValues extends Omit<Cocktail, "image" | "id"> {
  readonly image: null | File;
}
