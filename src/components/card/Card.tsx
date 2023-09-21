import { FC, useState } from "react";
import star from "../../assets/logo.png";
import "./Card.css";
import { useNavigate } from "react-router-dom";

export interface ICompany {
  url: string;
  averageRating: number;
  reviewCount: number;
  name: string;
  _id: string;
}

const Card: FC<ICompany> = ({ url, averageRating, reviewCount, name, _id }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`${_id}`)}>
      {reviewCount === 0 && <div className="card--badge">NEW</div>}
      {averageRating >= 4.5 && (
        <div className="card--badge background_yellow">EXCELLENT</div>
      )}
      <div className="card--image--container">
        <img src={url} className="card--image" />
      </div>
      <div className="card--stats text">
        <img src={star} className="card--star" />
        <span className="bold">{averageRating}</span>
        <span className="gray">({reviewCount} reviews)</span>
      </div>
      <p className="black small bold">{name}</p>
    </div>
  );
};

export default Card;
