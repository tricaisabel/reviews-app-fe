import { FC, useContext } from "react";
import "./StarRating.css";
import { DispatchContext, StateContext } from "../../App";
import { Action, SET_RATING } from "../../reducers/action.type";

export interface StarRatingProps {
  active: boolean;
}
const StarRating: FC<StarRatingProps> = ({ active }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const cursor = active === true ? "active" : "inactive";

  function setRating(rating: number) {
    dispatch({ type: SET_RATING, payload: rating });
  }

  function clickStar(index: number) {
    if (!active) {
      return;
    }
    setRating(index + 1);
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <button
          type="button"
          key={index}
          className={index < state.rating ? "on" : "off"}
          onClick={() => clickStar(index)}
        >
          <span className={`star ${cursor}`}>&#9733;</span>
        </button>
      ))}
      <p>State rating: {state.rating}</p>
    </div>
  );
};

export default StarRating;
