import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeDetail: null,
};
const recipeDetilsSlice = createSlice({
  name: "recipe-detail",
  initialState,
  reducers: {
    setRecipeDetail: (state, action) => {
      state.recipeDetail = action.payload;
    },
  },
});

export default recipeDetilsSlice;
export const { setRecipeDetail } = recipeDetilsSlice.actions;
