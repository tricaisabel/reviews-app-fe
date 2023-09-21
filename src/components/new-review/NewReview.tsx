import { FC, useState } from "react";
import StarRating from "../star-rating/StarRating";

interface NewReviewProps {}

const NewReview: FC<NewReviewProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function updateFormData(event: any) {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="container--info">
        <h1 className="center">Add a review</h1>

        <StarRating active={true} />

        <form onSubmit={openModal}>
          <label htmlFor="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            value={form.name}
            onChange={updateFormData}
          />

          <label htmlFor="description">
            <b>Description</b>
          </label>
          <input
            type="text"
            placeholder="Add more details on your experience"
            name="description"
            value={form.description}
            onChange={updateFormData}
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