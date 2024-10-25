export const initialFilter = {
  filters: {
    search: "",
    priceSlider: 0,
    selectedGenres: "",
    ratingFilter: "",
    sortFilter: "",
    filterProducts: [],
  },
};

export const FilterReducer = (state, { type, payload }) => {

  switch (type) {
    case "SEARCH_FILTER_CHANGE":
      return { ...state, filters: { ...state.filters, search: payload } }
    case "INITIALIZE_RANGE_FILTER":
      return { ...state, filters: { ...state.filters, priceSlider: payload } };

    case "RANGE_FILTER_CHANGE":
      return { ...state, filters: { ...state.filters, priceSlider: payload } };

    case "SELECTED_GENRES_CHANGE":
      return {...state, filters: { ...state.filters, selectedGenres: payload } };

    case "RATING_FILTER_CHANGE":
      return { ...state, filters: { ...state.filters, ratingFilter: payload } };

    case "SORT_FILTER_CHANGE":
      return { ...state, filters: { ...state.filters, sortFilter: payload } };

    case "CLEAR_FILTER_CHANGE":
      return {
        ...state,
        filters: {
          search: "",
          priceSlider: 20000,
          selectedGenres: "",
          ratingFilter: "",
          sortFilter: "",
          filterProducts: [],
        },
      };

    default:
      return state;
  }
};
