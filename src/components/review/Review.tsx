import { FC, useContext } from "react";
import "./Review.css";
import StarRating from "../star-rating/StarRating";
import { IReview } from "../../store/interfaces";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";

interface ReviewProps {
  review: IReview;
  isUserReview?: boolean;
}
const Review: FC<ReviewProps> = ({ review, isUserReview = false }) => {
  const state = useContext(StateContext);
  const navigate = useNavigate();

  function timeAgo(dateString: string): string {
    const currentDate = new Date();
    const date = new Date(dateString);

    const timeDifference = currentDate.getTime() - date.getTime();
    let minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    if (isNaN(weeks)) {
      minutes = 0;
    }

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (days < 7) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else {
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    }
  }

  return (
    <div className="review--container">
      <img
        src={review.userUrl}
        alt="Reviewer image"
        className="profile--image"
      />

      <div className="review--details">
        <h3 className="review--name">{review.name}</h3>

        <div className="review--rating">
          <StarRating numberOfStars={review.rating} size={"small"} />
          <p className="small">{timeAgo(review.createdAt)}</p>
        </div>

        {review.description && (
          <p className="review--description">{review.description}</p>
        )}
      </div>
    </div>
  );
};

export default Review;
