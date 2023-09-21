import { FC, useContext, useState } from "react";
import StarRating from "../star-rating/StarRating";
import { useNavigate } from "react-router-dom";
import { DispatchContext, StateContext } from "../../App";
import { Action, ActionType } from "../../store/actions";

interface NewReviewProps {}

const NewReview: FC<NewReviewProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal(event: any) {
    event.preventDefault();
    setIsModalOpen(true);
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

  return (
    <>
      <div className="container--info">
        <a className="blue" onClick={() => navigate("/companies")}>
          <span className="previous">&#8249;</span> All Companies
        </a>

        <h1 className="center">Add a review</h1>

        <div className="center">
          <StarRating showText={true} />
        </div>

        <form onSubmit={(e) => openModal(e)}>
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

          <button className="button_primary background_blue" type="submit">
            Submit
          </button>
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
