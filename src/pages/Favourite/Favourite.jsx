import { HeartCrack, HeartCrackIcon } from "lucide-react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Home from "../Home/Home";
//css
import classes from "./Favourite.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setRecipeDetail } from "../../redux/slice/recipeSlice";

const Favourite = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {favorites.length > 0 && (
        <>
          <div
            style={{
              marginBottom: "32px",
            }}
          >
            <p className={`${classes["title"]}`}>Hang tight! </p>
            <p className={`${classes["sub-title"]}`}>
              We're cooking up some delicious results for you...
            </p>
          </div>

          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favorites?.map((item, i) => {
              return (
                <RecipeCard
                  recipe={item}
                  key={i}
                  redirectOnClick={() => {
                    dispatch(setRecipeDetail(item));
                    navigate("/recipe-details");
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      {favorites.length == 0 && (
        <div className={`${classes["no-fav"]}`}>
          <HeartCrack size={68} style={{ color: "var(--clr-fav)" }} />
          <div>
            <p className={`${classes["sub-title"]}`}>
              It looks like you haven't added any favorites yet. Start exploring
              and save the ones you love!
            </p>
            <button
              className={`${classes["explore"]}`}
              onClick={() => {
                navigate("/");
              }}
            >
              Explore
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Favourite;
