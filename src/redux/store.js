import { configureStore } from "@reduxjs/toolkit";
import recipeDetilsSlice from "./slice/recipeSlice";

export const store = configureStore({
  reducer: {
    recipeDetail: recipeDetilsSlice.reducer,
  },
});
