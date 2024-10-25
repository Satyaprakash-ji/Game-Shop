export const initialState = {
  productsData: [],
  categories: { categoryName: "", categoryData: [] },
  cart: [],
  wishlist: [],
  paginationPage: 1,
}

export const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISED_DATA":
      return { ...state, productsData: payload };

    case "INITIALISED_CATEGORIES":
      return { ...state, categoriesData: payload };

    case "CATEGORY_FILTER":
      return { ...state, categoryName: payload };

    case "SELECTED_CATEGORIES":
      return { ...state, categoryData: payload };

    default:
      return state;
  }
};
