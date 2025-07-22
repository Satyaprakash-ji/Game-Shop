import "./StarRating.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_,index) => {
        const isFullStar = index < Math.floor(rating);
        const isHalfStar = index === Math.floor(rating) && rating % 1 !== 0;
        return (
          <span key={index} className="star">
            {isFullStar ? (
                <FaStar />
            ) : isHalfStar ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
