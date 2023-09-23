import { FC, useContext, useState } from "react";
import StarRating from "../star-rating/StarRating";
import { useParams } from "react-router-dom";
import { DispatchContext, StateContext } from "../../App";
import { Action, ActionType } from "../../store/actions";
import "./ReviewForm.css";
import {
  postReviewToCompany,
  updateReviewDescription,
} from "../../api/company";

const ReviewForm: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companyId } = useParams();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const title = `${
    state.reviewForm.editMode ? "Edit your" : "Add a"
  } review at ${state.company?.name}`;

  const showToastMessage = (message: string) => {
    dispatch({
      type: ActionType.SHOW_TOAST,
      payload: message,
    });

    setTimeout(() => {
      dispatch({ type: ActionType.HIDE_TOAST, payload: "" });
    }, 3000);
  };

  function closeModal() {
    setIsModalOpen(false);
    goBackToCompany();
  }

  function addReview() {
    if (state.reviewForm.rating !== -1 && companyId) {
      postReviewToCompany(companyId, state.reviewForm, showToastMessage).then(
        (review) => {
          dispatch({ type: ActionType.SET_USER_REVIEW, payload: review });
          setIsModalOpen(true);
        }
      );
    } else {
      dispatch({
        type: ActionType.SHOW_TOAST,
        payload: "You must choose a star rating first",
      });

      setTimeout(() => {
        dispatch({ type: ActionType.HIDE_TOAST, payload: "" });
      }, 3000);
    }
  }

  function editReview() {
    if (
      state.reviewForm.description !== "" &&
      state.userReview?._id &&
      companyId
    ) {
      updateReviewDescription(
        companyId,
        state.userReview?._id,
        state.reviewForm.description,
        showToastMessage
      ).then(() => {
        dispatch({
          type: ActionType.SET_USER_REVIEW_DESCRIPTION,
          payload: state.reviewForm.description,
        });
        setIsModalOpen(true);
      });
    } else {
      dispatch({
        type: ActionType.SHOW_TOAST,
        payload: "Please enter a description",
      });

      setTimeout(() => {
        dispatch({ type: ActionType.HIDE_TOAST, payload: "" });
      }, 3000);
    }
  }

  function submit(event: any) {
    event.preventDefault();
    state.reviewForm.editMode ? editReview() : addReview();
  }

  function updateReviewForm(event: any) {
    const { name, value } = event.target;
    dispatch({
      type: ActionType.SET_REVIEW_FORM,
      payload: {
        name,
        value,
      },
    });
  }

  function setRating(value: number) {
    if (state.reviewForm.editMode) return undefined;
    return dispatch({
      type: ActionType.SET_REVIEW_FORM,
      payload: {
        name: "rating",
        value,
      },
    });
  }

  function goBackToCompany() {
    dispatch({ type: ActionType.HIDE_REVIEW_FORM });
  }

  return (
    <>
      {state.company && state.reviewForm.show && (
        <div className="new--review--container">
          <a className="blue previous-btn" onClick={goBackToCompany}>
            <span className="previous">&#8249;</span> Reviews
          </a>

          <h1 className="center">{title}</h1>

          <div className="center">
            <StarRating
              showText={true}
              size={"big"}
              numberOfStars={state.reviewForm?.rating}
              onClick={setRating}
              disabled={state.reviewForm.editMode}
            />
          </div>

          <form onSubmit={(e) => submit(e)}>
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={state.reviewForm.name}
              onChange={updateReviewForm}
              className={state.reviewForm.editMode ? "disabled" : ""}
            />

            <label htmlFor="description">
              <b>Description</b>
            </label>
            <input
              type="text"
              placeholder="Add more details on your experience"
              name="description"
              value={state.reviewForm.description}
              onChange={updateReviewForm}
            />

            <div className="add--new-review">
              <button
                className="button_primary background_blue center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal--title">Thank you for your review.</h3>
            <p>You're helping others make smarter decisions every day.</p>

            <hr />
            <p className="center blue" onClick={closeModal}>
              Okay!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
