import classes from "./RecipeCardLoader.module.css";
import { Skeleton } from "@mui/material";

const RecipeCardLoader = () => {
  return (
    <>
      <div className={`${classes["recipe-card"]}`}>
        <div className={`${classes["recipe-background"]}`}>
          <div className={`${classes["img-skeleton"]}`}>
            <Skeleton variant="rounded" height={180} />
          </div>
        </div>
        <div className={`${classes["recipe-details"]}`}>
          <div className={`${classes["recipe-label"]}`}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className={`${classes["recipe-cuisineType"]}`}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className={`${classes["health-label"]}`}>
            <span>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </span>
            <span>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecipeCardLoader;
