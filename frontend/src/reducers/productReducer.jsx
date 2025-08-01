export const initialState = {
  productsData: [],
  categories: { categoriesData: [], categoryName: "", selectedCategoryData: [] },
  cart: [],
  wishlist: [],
  paginationPage: 1,
}

export const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISED_DATA":
      return { ...state, productsData: payload };

    case "INITIALISED_CATEGORIES":
      return { ...state, categories: { ...state.categories, categoriesData: payload  } };

    case "CATEGORY_FILTER":
      return { ...state, categories: { ...state.categories, categoryName: payload } };

    case "SELECTED_CATEGORY_DATA":
      return { ...state, categories: { ...state.categories, selectedCategoryData: payload } };

    default:
      return state;
  }
};
