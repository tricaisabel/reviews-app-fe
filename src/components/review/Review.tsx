import { FC } from "react";
import "./Review.css";
import StarRating from "../star-rating/StarRating";

export interface IReview {
  _id: string;
  rating: number;
  description?: string;
  name: string;
  userUrl: string;
  createdAt: string;
}

const Review: FC<IReview> = ({
  _id,
  rating,
  description,
  name,
  userUrl,
  createdAt,
}) => {
  function timeAgo(dateString: string): string {
    const currentDate = new Date();
    const date = new Date(dateString);

    const timeDifference = currentDate.getTime() - date.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

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
      <img src={userUrl} alt="Reviewer image" className="profile--image" />

      <div className="review--details">
        <h3 className="review--name">{name}</h3>

        <div className="review--rating">
          <StarRating active={false} />
          <p className="small">{timeAgo(createdAt)}</p>
        </div>

        {description ? (
          <p className="review--description">{description}</p>
        ) : (
          <a href="#" className="blue">
            Describe your experience
          </a>
        )}
      </div>
    </div>
  );
};

export default Review;