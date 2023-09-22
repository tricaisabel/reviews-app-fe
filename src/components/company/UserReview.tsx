import { useContext } from "react";
import { DispatchContext, StateContext } from "../../App";
import Review from "../review/Review";
import StarRating from "../star-rating/StarRating";
import { Action, ActionType } from "../../store/actions";
import "./Company.css";

export const UserReview = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const USER_IMAGE =
    "https://firebasestorage.googleapis.com/v0/b/reviews-app-9ff65.appspot.com/o/users%2Fanonymous-avatar-icon-25.jpg?alt=media&token=bd1f7e5b-b1bf-4411-b649-f3b542a0a005";

  function showReviewForm(editMode: boolean) {
    dispatch({ type: ActionType.SHOW_REVIEW_FORM, payload: { editMode } });
  }

  return (
    <>
      <h3>Your Review</h3>
      {state.company && state.userReview && (
        <Review review={state.userReview} isUserReview={true} />
      )}

      {state.company &&
        state.userReview &&
        state.userReview.description === "" && (
          <a
            className="blue add--description-btn"
            onClick={() => showReviewForm(true)}
          >
            Describe your experience
          </a>
        )}

      {state.company && !state.userReview && (
        <div className="review--container">
          <img
            src={USER_IMAGE}
            alt="Reviewer image"
            className="profile--image"
          />

          <div
            className="review--details"
            onClick={() => showReviewForm(false)}
          >
            <h3>Rate and review</h3>
            <p className="small">Share your experience to help others.</p>
            <StarRating />
          </div>
        </div>
      )}
      <hr />
    </>
  );
};
