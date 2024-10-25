import { useContext } from "react";
import { FilterContext, FilterDispatchContext } from "../../contexts/FilterContext";

const FilterBox = () => {

    const { minRangeValue, maxRangeValue, filters } = useContext(FilterContext);
    const {filterDispatch} = useContext(FilterDispatchContext);
    const savedData = JSON.parse(localStorage.getItem("selectedCategoryData"))
    const uniqueGenres = [...new Set(savedData?.map((item) => item.Genre).flat())]
    const isGenreAvailable = uniqueGenres?.some((gener) => gener !== undefined)

    const handleGenreFilterChange = (event) => {
      filterDispatch({
        type: "SELECTED_GENRES_CHANGE",
        payload: event.target.value,
      })
    }

    const handlePriceRangeFilterChange = (event) => {
      filterDispatch({
        type: "RANGE_FILTER_CHANGE",
        payload: event.target.value
      })
    }

    const handleRatingFilterChange = (event) => {
      filterDispatch({
        type: "RATING_FILTER_CHANGE",
        payload: event.target.value
      })
    }

    const handleSortFilterChange = (event) => {
      filterDispatch({
        type: "SORT_FILTER_CHANGE",
        payload: event.target.value
      })
    }

    const handleClearFilterChange = (event) => {
      filterDispatch({
        type: "CLEAR_FILTER_CHANGE",
        payload: event.target.value
      })
    }


    return (
      <div className="filter-box">
        <div className="filter-heading">
          <h3>Filters</h3>
          <p onClick={handleClearFilterChange} value="clear" style={{cursor: "pointer"}} >Clear All Filters</p>
        </div>
        <div className="price-range">
          <h4>Price</h4>
          <label>
            <span className="price-range-min-max">
              <span>{minRangeValue}</span>
              <span>{maxRangeValue}</span>
            </span>
            <input
              type="range"
              className="price-range-filter"
              min={minRangeValue}
              max={maxRangeValue}
              value={filters.priceSlider}
              onChange={handlePriceRangeFilterChange}
            />
            {filters.priceSlider}
          </label>
        </div>
        { isGenreAvailable &&
          <div className="genre-checkbox-filter-box">
            <h4>Genres</h4>
            { uniqueGenres?.map((genre) => (
              <label>
                <input
                  type="checkbox"
                  key={genre}
                  checked={filters.selectedGenres.includes(genre)}
                  onChange={(event) => handleGenreFilterChange(event)}
                  value={genre}
                  className="genre-checkbox-filter"
                />
                {genre}
              </label>
            ))}
          </div>
        }
        {/* Rating Filter */}
        <div className="rating-radio-filter-box flex-center flex-dir-co">
          <h4>Rating</h4>
          <label>
            <input
              type="radio"
              className="rating-radio-filter"
              value="4"
              checked={filters.ratingFilter === "4"}
              onChange={handleRatingFilterChange}
            />{" "}
            4 Star and above
          </label>
          <label>
            <input
              type="radio"
              className="rating-radio-filter"
              value="3"
              checked={filters.ratingFilter === "3"}
              onChange={handleRatingFilterChange}
            />{" "}
            3 Stars and above
          </label>
          <label>
            <input
              type="radio"
              className="rating-radio-filter"
              value="2"
              checked={filters.ratingFilter === "2"}
              onChange={handleRatingFilterChange}
            />{" "}
            2 Stars and above
          </label>
          <label>
            <input
              type="radio"
              className="rating-radio-filter"
              value="1"
              checked={filters.ratingFilter === "1"}
              onChange={handleRatingFilterChange}
            />{" "}
            1 Star and above
          </label>
        </div>
        {/* Sort by Price */}
        <div className="sort-price-radio-filter-box flex-center flex-dir-co">
          <h4>Sort</h4>
          <label>
            <input
              type="radio"
              className="sort-price-radio-filter"
              checked={filters.sortFilter === "POPULARITY"}
              value="POPULARITY"
              onChange={handleSortFilterChange}
            />{" "}
            Popularity
          </label>
          <label>
            <input
              type="radio"
              className="sort-price-radio-filter"
              checked={filters.sortFilter === "LOW_TO_HIGH"}
              value="LOW_TO_HIGH"
              onChange={handleSortFilterChange}
            />{" "}
            Price: Low To High
          </label>
          <label>
            <input
              type="radio"
              className="sort-price-radio-filter"
              checked={filters.sortFilter === "HIGH_TO_LOW"}
              value="HIGH_TO_LOW"
              onChange={handleSortFilterChange}
            />{" "}
            Price: High To Low
          </label>
        </div>
      </div>
    );
}

export default FilterBox;