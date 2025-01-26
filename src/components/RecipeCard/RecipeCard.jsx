//css
import { Heart, HeartPulse, Soup, Timer, Utensils } from "lucide-react";
import classes from "./RecipeCard.module.css";
import { useState } from "react";
import { Skeleton } from "@mui/material";

const RecipeCard = ({
  recipe = {},
  ref = null,
  redirectOnClick = () => {},
}) => {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <div
        className={`${classes["recipe-card"]}`}
        ref={ref}
        onClick={() => {
          redirectOnClick();
        }}
      >
        <div className={`${classes["recipe-background"]}`}>
          <img
            src={recipe?.image}
            className={`${classes["recipe-img"]}`}
            loading="lazy"
            alt={recipe?.label || "Recipe Image"}
          />
          <div
            className={`${classes["fav"]}`}
            onClick={(e) => {
              e.stopPropagation();
              addRecipeToFavorites();
            }}
          >
            {isFavorite ? (
              <Heart className={`${classes["heart"]}`} />
            ) : (
              <Heart color="#ff6347" />
            )}
          </div>
          <div className={`${classes["serving"]}`}>
            <Utensils size={16} /> <p>{recipe.yield} Serving(s)</p>
          </div>
          <div className={`${classes["timing"]}`}>
            <Timer size={16} />
            <p>{recipe?.totalTime <= 0 ? 10 : recipe?.totalTime} min</p>
          </div>
        </div>
        <div className={`${classes["recipe-details"]}`}>
          <div className={`${classes["recipe-label"]}`}>{recipe?.label}</div>
          <div className={`${classes["recipe-cuisineType"]}`}>
            {recipe?.cuisineType}
          </div>
          <div className={`${classes["health-label"]}`}>
            <div className={`${classes["health-item"]}`}>
              <HeartPulse size={14} />
              <span className="text-sm tracking-tighter font-semibold">
                {recipe?.healthLabels?.[0]}
              </span>
            </div>
            <div className={`${classes["health-item"]}`}>
              <HeartPulse size={14} />
              <span className="text-sm tracking-tighter font-semibold">
                {recipe?.healthLabels?.[2]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
