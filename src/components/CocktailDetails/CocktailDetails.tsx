import React from "react";
import { Cocktail } from "../../types/Cocktail";
import { Detail } from "../Detail";
import "./index.css";

export const CocktailDetails = React.memo(
  ({ image, instructions, category, glass, recipy }: Cocktail) => (
    <div className="cocktail-details">
      <div className="image-container">
        <img src={image} className="image" alt="" />
      </div>
      <div className="details">
        {instructions && <Detail label="Instrcutions" value={instructions} />}
        {category && <Detail label="Category" value={category} />}
        {glass && <Detail label="Glass" value={glass} />}
        {recipy.length && (
          <Detail
            label="Recipy"
            value={
              <div>
                {recipy.map(({ measure, ingredient }) => (
                  <div>
                    <div>
                      <span>{measure}</span>
                      <span>{ingredient}</span>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        )}
      </div>
    </div>
  )
);
