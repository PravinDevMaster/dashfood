import { useDispatch, useSelector } from "react-redux";
import classes from "./RecipeDetail.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  CookingPot,
  Heart,
  ImageIcon,
  ShoppingBasket,
  Soup,
  SquarePlus,
  Timer,
  Utensils,
} from "lucide-react";
import useApiHttp from "../../hooks/useApiHttp";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCardLoader from "../../components/RecipeCardLoader/RecipeCardLoader";
import { setRecipeDetail } from "../../redux/slice/recipeSlice";
import IconImage from "../../components/IconImage/IconImage";

const RecipeDetail = () => {
  const { recipeDetail } = useSelector((state) => state?.recipeDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipeDetail?.label)
  );
  const [recipeList, setRecipeList] = useState([]);
  const { isLoading: recipeGetting, sendRequest: getRecipeApi } = useApiHttp();
  const [count, setCount] = useState(0);
  const [more, setMore] = useState(true);
  const [dishType, setDishType] = useState(
    recipeDetail?.dishType?.[0] || "starter"
  );
  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipeDetail?.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipeDetail?.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipeDetail);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const getRecipeHandler = (count, dishType) => {
    const app_key = process.env.REACT_APP_APP_KEY;
    const app_id = process.env.REACT_APP_APP_ID;
    let url = `https://api.edamam.com/search?q=${dishType}&app_id=${app_id}&app_key=${app_key}&from=${count}&to=${
      count + 12
    }`;

    getRecipeApi(
      {
        url,
        method: "GET",
      },
      (data) => {
        if (Array.isArray(data?.hits)) {
          if (count == 0) {
            setRecipeList(data?.hits);
          } else {
            setRecipeList((pre) => [...pre, ...data?.hits]);
          }
        }
        setMore(data?.more || false);
      }
    );
  };

  //Impletent the infinity scrolling for getting the data
  const observerRef = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      if (recipeGetting) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((element) => {
        if (element[0].isIntersecting && count < 36 && more) {
          setCount((pre) => pre + 12);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [recipeGetting, count]
  );

  useEffect(() => {
    getRecipeHandler(count, dishType);
  }, [count, dishType]);

  useEffect(() => {
    if (recipeDetail === null || typeof recipeDetail !== "object") {
      console.log("hello", recipeDetail);
      navigate("/");
    }
  }, []);

  return (
    <div className={`${classes["recipe-section"]}`}>
      <div
        className={`${classes["back"]}`}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft size={16} /> Back
      </div>
      <div className={`${classes["title"]}`}>{recipeDetail?.label}</div>
      <div className={`${classes["recipe-background"]}`}>
        <img
          src={recipeDetail?.image}
          className={`${classes["recipeDetail-img"]}`}
          loading="lazy"
          alt={recipeDetail?.label || "recipeDetail Image"}
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
          <Utensils size={16} /> <p>{recipeDetail?.yield} Serving(s)</p>
        </div>
        <div className={`${classes["timing"]}`}>
          <Timer size={16} />
          <p>
            {recipeDetail?.totalTime <= 0 ? 10 : recipeDetail?.totalTime} min
          </p>
        </div>
      </div>
      <div className={`${classes["ingredients"]}`}>
        <div className={`${classes["ingredients-title"]}`}>
          <ShoppingBasket />
          Ingredients
        </div>
        <div className={`${classes["ingredients-list"]}`}>
          {recipeDetail?.ingredients?.map((item, i) => {
            return (
              <>
                <div className={`${classes["ingredients-item"]}`}>
                  {/* <img src={item?.image} alt="img" /> */}
                  <IconImage url={item?.image} />
                  {item?.text}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className={`${classes["preparation"]}`}>
        <div className={`${classes["preparation-title"]}`}>
          <CookingPot />
          Preparation
        </div>
        <a
          className={`${classes["instructions"]}`}
          href={recipeDetail?.url}
          target="blank"
        >
          {" "}
          Instructions
        </a>
      </div>
      <div className={`${classes["suggestion"]}`}>
        <div className={`${classes["suggestion-title"]}`}>
          <SquarePlus />
          Suggestion
        </div>
      </div>
      {recipeList.length > 0 && (
        <div
          className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: "16px" }}
        >
          {recipeList?.map((item, i) => {
            return (
              <RecipeCard
                recipe={item?.recipe}
                key={i}
                ref={i + 1 == recipeList?.length ? lastElementRef : null}
                redirectOnClick={() => {
                  dispatch(setRecipeDetail(item?.recipe));
                  navigate("/recipe-details");
                }}
              />
            );
          })}
        </div>
      )}

      {recipeGetting && (
        <div
          className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: "16px" }}
        >
          {[...Array(9)].map((_, i) => (
            <RecipeCardLoader />
          ))}
        </div>
      )}
    </div>
  );
};
export default RecipeDetail;
