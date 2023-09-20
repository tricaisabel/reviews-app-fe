import { FC } from "react";
import star from "../../assets/logo.png";
import "./Card.css";

export interface CardProps {
  img: string;
  averageRating: number;
  reviewCount: number;
  name: string;
}

const Card: FC<CardProps> = ({ img, averageRating, reviewCount, name }) => {
  return (
    <div className="card">
      {reviewCount === 0 && <div className="card--badge">NEW</div>}
      <div className="card--image--container">
        <img src={img} className="card--image" />
      </div>
      <div className="card--stats text">
        <img src={star} className="card--star" />
        <span>
          <span className="bold">{averageRating}</span> / 5
        </span>
        <span className="gray">({reviewCount} reviews)</span>
      </div>
      <h3 className="bold">{name}</h3>
    </div>
  );
};

export default Card;
