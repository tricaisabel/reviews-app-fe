import React, { FC, useContext } from "react";
import star from "../../assets/logo.png";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { ICompany } from "../../store/interfaces";
import { Action, ActionType } from "../../store/actions";
import { DispatchContext } from "../../App";

const Card: FC<ICompany> = (company: ICompany) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const newBadge = <div className="card--badge">NEW</div>;
  const excellentBadge = (
    <div className="card--badge background_yellow">EXCELLENT</div>
  );

  function selectCompany() {
    // dispatch({ type: ActionType.SET_COMPANY, payload: company });
    navigate(`${company._id}`);
  }

  return (
    <div className="card" onClick={selectCompany}>
      {company.reviewCount === 0 && newBadge}
      {company.averageRating >= 4.5 && excellentBadge}

      <div className="card--image--container">
        <img src={company.url} alt={company.name} className="card--image" />
      </div>

      <div className="card--stats text">
        <img src={star} alt="star" className="card--star" />
        <span className="bold">{company.averageRating}</span>
        <span className="gray">
          ({company.reviewCount} review {company.reviewCount !== 1 && "s"})
        </span>
      </div>
      <p className="black small bold">{company.name}</p>
    </div>
  );
};

export default Card;
