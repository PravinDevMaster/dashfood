import classes from "./Home.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import useApiHttp from "../../hooks/useApiHttp";
import RecipeCardLoader from "../../components/RecipeCardLoader/RecipeCardLoader";
import { CircleX, Filter, Search } from "lucide-react";
import MuiPopover from "../../components/MuiPopover/MuiPopover";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setRecipeDetail } from "../../redux/slice/recipeSlice";

const FilterBtn = (props) => (
  <div className={`${classes["filter-div"]}`} {...props}>
    <Filter />
    <p>Filter</p>
  </div>
);

const FilterContiner = ({
  checkMeal = null,
  applyFilter = () => {},
  close = () => {},
}) => {
  const [mealType, setMealType] = useState(null);
  useEffect(() => {
    setMealType(checkMeal);
  }, []);
  return (
    <div className={`${classes["filter-container"]}`}>
      <div className={`${classes["filter-type"]}`}>
        <p className={`${classes["filter-head"]}`}>Meal Type</p>
        <div
          className={`${classes["filter-item"]}`}
          onClick={() => {
            setMealType("breakfast");
          }}
        >
          <input type="radio" checked={mealType === "breakfast"} />
          <p>Breakfast</p>
        </div>
        <div
          className={`${classes["filter-item"]}`}
          onClick={() => {
            setMealType("lunch");
          }}
        >
          <input type="radio" checked={mealType === "lunch"} />
          <p>Lunch</p>
        </div>
        <div
          className={`${classes["filter-item"]}`}
          onClick={() => {
            setMealType("dinner");
          }}
        >
          <input type="radio" checked={mealType === "dinner"} />
          <p>Dinner</p>
        </div>
      </div>
      {/* <div className={`${classes["filter-type"]}`}>
        <p className={`${classes["filter-head"]}`}>Dietary Preferences</p>
        <div className={`${classes["filter-item"]}`}>
          <input type="radio" lable />
          <p>Gluten-Free</p>
        </div>
        <div className={`${classes["filter-item"]}`}>
          <input type="radio" lable />
          <p>Dairy-Free</p>
        </div>
        <div className={`${classes["filter-item"]}`}>
          <input type="radio" lable />
          <p>Vegan</p>
        </div>
        <div className={`${classes["filter-item"]}`}>
          <input type="radio" lable />
          <p>Keto</p>
        </div>
      </div> */}
      <div
        className={`${classes["filter-btn"]}`}
        onClick={() => {
          applyFilter(mealType);
          close();
        }}
      >
        Apply Filter
      </div>
    </div>
  );
};
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: recipeGetting, sendRequest: getRecipeApi } = useApiHttp();
  const [recipeList, setRecipeList] = useState([]);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState("");
  const [more, setMore] = useState(true);
  const [inputVal, setInputVal] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const getRecipeHandler = (count, query, mealType) => {
    const random = ["asian", "chennai", "usa", "china", "thai"];
    const randomIndex = Math.floor(Math.random() * random.length);
    const randomValue = random[randomIndex];
    const app_key = process.env.REACT_APP_APP_KEY;
    const app_id = process.env.REACT_APP_APP_ID;
    let url = `https://api.edamam.com/search?q=${
      query || randomValue
    }&app_id=${app_id}&app_key=${app_key}&from=${count}&to=${count + 12}`;

    if (mealType) {
      url += `&mealType=${mealType}`;
    }

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
        setTotalCount(data?.count);
      },
      (err, data) => {
        setError(true);
        setErrorMsg(data?.message || "");
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
        if (element[0].isIntersecting && count < totalCount && more) {
          setCount((pre) => pre + 13);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [recipeGetting, count]
  );

  useEffect(() => {
    getRecipeHandler(count, query, mealType);
  }, [count, query, mealType]);

  if (error) {
    return (
      <div>
        <p className={`${classes["title"]}`}>
          {errorMsg || "Someting went worng!"}
        </p>
        <p className={`${classes["sub-title"]}`}>Try it later!</p>
      </div>
    );
  }
  return (
    <>
      <div className={`${classes["poistion-sticky"]}`}>
        <div className={`${classes["sea-fil-aling"]}`}>
          <div className={`${classes["search-div"]}`}>
            <input
              type="text"
              className={`${classes["search-box"]}`}
              placeholder="Search..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <div
              className={`${classes["search-icon"]}`}
              onClick={() => {
                setCount(0);
                setQuery(inputVal);
                setRecipeList([]);
              }}
            >
              <Search color="white" />
            </div>
          </div>
          {!mealType && (
            <MuiPopover
              trigger={{
                component: FilterBtn,
              }}
            >
              <FilterContiner
                checkMeal={mealType}
                applyFilter={(data) => {
                  setCount(0);
                  setRecipeList([]);
                  setMealType(data);
                }}
              />
            </MuiPopover>
          )}

          {mealType && (
            <div
              className={`${classes["remove-filter"]}`}
              onClick={() => {
                setCount(0);
                setRecipeList([]);
                setMealType(null);
              }}
            >
              {mealType} <CircleX size={16} />{" "}
            </div>
          )}
        </div>
        {recipeGetting && recipeList.length == 0 && (
          <div>
            <p className={`${classes["title"]}`}>Hang tight! </p>
            <p className={`${classes["sub-title"]}`}>
              We're cooking up some delicious results for you...
            </p>
          </div>
        )}
        {!query && recipeList.length > 0 && (
          <div>
            <p className={`${classes["title"]}`}>Welcome to Recipe Haven!</p>
            <p className={`${classes["sub-title"]}`}>
              Get ready to discover delicious recipes tailored just for you!
            </p>
          </div>
        )}
        {query && recipeList.length > 0 && (
          <div>
            <p className={`${classes["title"]}`}>
              Explore these tasty options!
            </p>
            <p className={`${classes["sub-title"]}`}>
              Here’s what we found for your search!
            </p>
          </div>
        )}
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

      {!recipeGetting && recipeList.length == 0 && (
        <>
          <div>
            <p className={`${classes["title"]}`}>Try something else!</p>
            <p className={`${classes["sub-title"]}`}>
              Oops! We couldn't find any recipes for that.
            </p>
          </div>
          <div
            className={`${classes["remove-filter"]}`}
            onClick={() => {
              setCount(0);
              setRecipeList([]);
              setMealType(null);
              setInputVal("");
              setQuery("");
            }}
            style={{
              width: "fit-content",
            }}
          >
            Clear filter <CircleX size={16} />{" "}
          </div>
        </>
      )}
    </>
  );
};
export default Home;
