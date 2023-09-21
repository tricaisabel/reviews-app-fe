import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "../../App";
import Review from "../review/Review";
import StarRating from "../star-rating/StarRating";
import { useNavigate, useParams } from "react-router-dom";
import { getUserReview } from "../../api/company";
import { IReview } from "../../store/interfaces";
import { Action, ActionType } from "../../store/actions";

export const UserReview = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const navigate = useNavigate();
  const USER_IMAGE =
    "https://firebasestorage.googleapis.com/v0/b/reviews-app-9ff65.appspot.com/o/users%2Fanonymous-avatar-icon-25.jpg?alt=media&token=bd1f7e5b-b1bf-4411-b649-f3b542a0a005";

  function openNewReview() {
    navigate(`/companies/${state.company._id}/new`);
  }

  function setUserReview(review: IReview) {
    dispatch({ type: ActionType.SET_USER_REVIEW, payload: review });
  }

  useEffect(() => {
    if (!state.company._id) {
      return navigate("/");
    }
    getUserReview(state.company._id, setUserReview);
  }, [state.company._id]);

  return (
    <>
      <h3>Your Review</h3>
      {state.userReview && <Review {...state.userReview} />}

      {!state.userReview && (
        <div className="review--container">
          <img
            src={USER_IMAGE}
            alt="Reviewer image"
            className="profile--image"
          />

          <div className="review--details" onClick={openNewReview}>
            <h3>Rate and review</h3>
            <p className="small">Share your experience to help others.</p>
            <StarRating />
          </div>
        </div>
      )}
    </>
  );
};
