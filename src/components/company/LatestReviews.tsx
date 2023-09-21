import { useContext, useEffect } from "react";
import { StateContext, DispatchContext } from "../../App";
import { IReview } from "../../store/interfaces";
import { Action, ActionType } from "../../store/actions";
import Review from "../review/Review";
import { getLatestReviews } from "../../api/company";
import { useNavigate, useParams } from "react-router-dom";

export const LatestReview = () => {
  const state = useContext(StateContext);
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function loadDefaultReviews() {
    dispatch({ type: ActionType.LOAD_DEFAULT_REVIEWS });
  }

  function loadMoreReviews() {
    dispatch({ type: ActionType.LOAD_MORE_REVIEWS });
  }

  function setLatestReviews(reviews: IReview[]) {
    dispatch({ type: ActionType.SET_LATEST_REVIEWS, payload: reviews });
  }

  useEffect(() => {
    if (!state.company._id) {
      return navigate("/companies");
    }
    getLatestReviews(state.company._id, state.company.end, setLatestReviews);
  }, [state.company.end, state.company._id]);

  return (
    <>
      <h3>Latest Reviews</h3>
      {state.latestReviews.length !== 0 &&
        state.latestReviews.map((review: IReview, index: number) => (
          <div key={review._id}>
            {index !== 0 && <hr />}
            <Review {...review} />
          </div>
        ))}

      {state.company.end < state.company.reviewCount && (
        <a className="blue bold center" onClick={loadMoreReviews}>
          Load more reviews
        </a>
      )}

      {state.company.end >= state.company.reviewCount &&
        state.latestReviews.length > 0 && (
          <a className="blue bold center" onClick={loadDefaultReviews}>
            Show top review
          </a>
        )}

      {state.company.reviewCount == 0 && (
        <p className="small">No reviews yet. You can be our first reviewer.</p>
      )}
    </>
  );
};
