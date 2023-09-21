import { FC, useContext, useState } from "react";
import StarRating from "../star-rating/StarRating";
import { useNavigate } from "react-router-dom";
import { DispatchContext, StateContext } from "../../App";
import { Action, ActionType } from "../../store/actions";
import "./NewReview.css";
import { postReviewToCompany } from "../../api/company";

interface NewReviewProps {}

const NewReview: FC<NewReviewProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

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
  }

  function addReview(event: any) {
    event.preventDefault();
    if (state.reviewForm.rating !== -1) {
      postReviewToCompany(
        state.company._id,
        state.reviewForm,
        showToastMessage
      );
      goBackToCompany();
      setIsModalOpen(true);
    } else {
      showToastMessage("You must choose a star rating first");
    }
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

  function goBackToCompany() {
    navigate(`/companies/${state.company._id}`);
  }

  return (
    <>
      <div className="new--review--container">
        <a className="blue previous-btn" onClick={goBackToCompany}>
          <span className="previous">&#8249;</span> Reviews
        </a>

        <h1 className="center">Add a review</h1>

        <div className="center">
          <StarRating showText={true} />
        </div>

        <form onSubmit={(e) => addReview(e)}>
          <label htmlFor="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            value={state.reviewForm.name}
            onChange={updateReviewForm}
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

export default NewReview;
