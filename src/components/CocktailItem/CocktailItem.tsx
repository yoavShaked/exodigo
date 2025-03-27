import React from "react";
import { Cocktail } from "../../types/Cocktail";
import "./index.css";

export const CocktailItem = ({ image }: Cocktail) => (
  <div className="cocktail">
    <img src={image} className="image" />
  </div>
);
