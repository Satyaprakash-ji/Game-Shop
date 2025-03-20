import { createContext, useContext, useEffect, useReducer } from "react";
import { initialFilter, FilterReducer } from "../reducers/filterReducer";
import { ProductContext } from "../contexts/ProductContext";

export const FilterContext = createContext();
export const FilterDispatchContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { products } = useContext(ProductContext);

  const [filterState, filterDispatch] = useReducer(
    FilterReducer,
    initialFilter
  );

  const savedCategoryData = JSON.parse(
    localStorage.getItem("selectedCategoryData")
  );

  const minRangeValue = savedCategoryData?.reduce(
    (result, game) => (result > game.price ? game.price : result),
    savedCategoryData[0].price
  );

  const maxRangeValue = savedCategoryData?.reduce(
    (result, game) => (result < game.price ? game.price : result),
    savedCategoryData[0].price
  );

  const searchFilteredProduct =
    filterState?.filters?.search?.length > 0
      && products?.productsData?.products?.filter((game) =>
          game.title
            .toLowerCase()
            .includes(filterState?.filters?.search?.toLowerCase())
        )
      // : savedCategoryData;

  const priceRangeFilteredProduct = savedCategoryData?.filter((game) => game?.price <= filterState?.filters?.priceSlider );

  const genreFilteredProduct = filterState?.filters?.selectedGenres?.length > 0 ? priceRangeFilteredProduct?.filter((game) => game?.Genre?.includes(filterState?.filters?.selectedGenres) ) : priceRangeFilteredProduct;

  const ratingFilteredProduct = filterState?.filters?.ratingFilter?.length > 0 ? genreFilteredProduct?.filter((game) => game.rating >= filterState?.filters?.ratingFilter ) : genreFilteredProduct;

  const sortByPriceFilteredProduct = filterState?.filters?.sortFilter?.length > 0 ? (() => {
    switch(filterState.filters.sortFilter){
        case "LOW_TO_HIGH":
            return [...ratingFilteredProduct]?.sort((a,b) => a.price - b.price );
        case "HIGH_TO_LOW":
            return [...ratingFilteredProduct]?.sort((a,b) => b.price - a.price);
        case "POPULARITY":
            return [...ratingFilteredProduct]?.sort((a,b) => b.rating - a.rating )
        default:
            return ratingFilteredProduct; 
    }
  })() : ratingFilteredProduct;

  useEffect(() => {
    (function () {
      filterDispatch({
        type: "INITIALIZE_RANGE_FILTER",
        payload: maxRangeValue,
      });
    })();
  }, [minRangeValue, maxRangeValue]);

  return (
    <FilterContext.Provider
      value={{ minRangeValue, maxRangeValue, filters: filterState.filters, sortByPriceFilteredProduct, searchFilteredProduct}}
    >
      <FilterDispatchContext.Provider value={{ filterDispatch }}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
};
