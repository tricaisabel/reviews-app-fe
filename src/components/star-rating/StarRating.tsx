import { FC } from "react";
import "./StarRating.css";

export interface StarRatingProps {
  showText?: boolean;
  numberOfStars?: number;
  onClick?: (value: number) => void;
  size: "big" | "small";
  disabled?: boolean;
}
const StarRating: FC<StarRatingProps> = ({
  showText,
  numberOfStars = -1,
  onClick,
  size,
  disabled = false,
}) => {
  const cursor = onClick && !disabled ? "active" : "inactive";

  function clickStar(index: number) {
    onClick && onClick(index + 1);
  }

  function getClasses(index: number) {
    let color = "";
    if (index < numberOfStars) {
      color = disabled ? " dark_grey" : " yellow";
    } else {
      color = "light_grey";
    }
    return `${size} ${cursor} ${color}`;
  }

  function textRating(rating: number) {
    switch (rating) {
      case 1:
        return "I wouldn't recommend to anyone";
      case 2:
        return "Overall bad experience";
      case 3:
        return "Average experience";
      case 4:
        return "Pleasant experience";
      case 5:
        return "I would recommend to everyone to visit";
      default:
        return;
    }
  }

  return (
    <div className="star-rating">
      <div>
        {[...Array(5)].map((_, index) => (
          <button
            type="button"
            key={index}
            className={getClasses(index)}
            onClick={() => clickStar(index)}
          >
            <span className={`star ${cursor}`}>&#9733;</span>
          </button>
        ))}
      </div>

      {showText && <p>{textRating(numberOfStars)}</p>}
    </div>
  );
};

export default StarRating;
