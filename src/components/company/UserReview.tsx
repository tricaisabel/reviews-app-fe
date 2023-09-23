import { useContext } from "react";
import { DispatchContext, StateContext } from "../../App";
import Review from "../review/Review";
import StarRating from "../star-rating/StarRating";
import { Action, ActionType } from "../../store/actions";
import "./Company.css";
import { USER_IMAGE } from "../../store/intialState";

export const UserReview = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function showReviewForm(editMode: boolean) {
    dispatch({ type: ActionType.SHOW_REVIEW_FORM, payload: { editMode } });
  }

  function setRating(value: number) {
    dispatch({
      type: ActionType.SET_REVIEW_FORM,
      payload: {
        name: "rating",
        value,
      },
    });
  }

  return (
    <>
      {state.company && (
        <>
          <h3>Your Review</h3>
          {state.userReview && <Review review={state.userReview} />}

          {state.userReview && state.userReview.description === "" && (
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

              <div className="review--details">
                <h3>Rate and review</h3>
                <p className="small">Share your experience to help others.</p>
                <div onClick={() => showReviewForm(false)}>
                  <StarRating size={"big"} onClick={setRating} />
                </div>
              </div>
            </div>
          )}
          <hr />
        </>
      )}
    </>
  );
};
