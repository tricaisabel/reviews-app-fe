import { FC } from "react";
import "./StarRating.css";

const RatingText: Record<number, string> = {
  1: "I hated it",
  2: "I didn't like it",
  3: "It was OK",
  4: "I liked it",
  5: "I loved it",
};

export interface StarRatingProps {
  showText?: boolean; // displays the corresponding text of the selected rating
  numberOfStars?: number; // default value of selected stars
  onClick?: (value: number) => void; // handle function for clicking a star
  size: "big" | "small"; // size of the stars
  disabled?: boolean; // makes the control disabled
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

  function getClass(index: number) {
    let color = "";
    if (index < numberOfStars) {
      color = disabled ? " dark_grey" : " yellow";
    } else {
      color = "light_grey";
    }
    return `${size} ${cursor} ${color}`;
  }

  function textRating(rating: number): string {
    return RatingText[rating];
  }

  return (
    <div className="star-rating">
      <div>
        {[...Array(5)].map((_, index) => (
          <button
            type="button"
            key={index}
            className={getClass(index)}
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
