import { useContext } from "react";
import { DispatchContext, StateContext } from "../../App";
import { Action, ActionType } from "../../store/actions";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function loadAllReviews() {
    dispatch({ type: ActionType.LOAD_ALL_REVIEWS });
  }

  return (
    <>
      <div className="summary--info">
        <div className="rating--box bold">{state.company.averageRating}</div>

        <p className="small summary--counter">
          from {state.company.reviewCount} review
          {state.company.reviewCount > 0 && "s"}
        </p>

        {state.latestReviews.length > 0 && state.company && (
          <a className="blue right" onClick={loadAllReviews}>
            View all reviews
          </a>
        )}
      </div>
    </>
  );
};
