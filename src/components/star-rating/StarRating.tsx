import { FC, useContext } from "react";
import "./StarRating.css";
import { DispatchContext, StateContext } from "../../App";
import { Action, ActionType } from "../../store/actions";

export interface StarRatingProps {
  showText?: boolean;
  value?: number;
}
const StarRating: FC<StarRatingProps> = ({ showText, value }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const isClickable = value === undefined;
  const numberOfStars = isClickable ? state.reviewForm.rating : value;

  const cursor = isClickable ? "active" : "inactive";

  function setRating(rating: number) {
    dispatch({ type: ActionType.SET_RATING, payload: rating });
  }

  function clickStar(index: number) {
    isClickable && setRating(index + 1);
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
        {[...Array(5)].map((star, index) => (
          <button
            type="button"
            key={index}
            className={index < numberOfStars ? "on" : "off"}
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
