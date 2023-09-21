import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompany, getLatestReviews, getUserReview } from "../../api/company";
import "./Company.css";
import { ICompany } from "../../store/interfaces";
import { StateContext, DispatchContext } from "../../App";
import { Action, ActionType } from "../../store/actions";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import { LatestReview } from "./LatestReviews";

const Company: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  return (
    <div>
      {state.company && (
        <>
          <img
            src={state.company.url}
            alt="Company photo"
            className="container--image"
          />

          <div className="container--info">
            <a className="blue" onClick={() => navigate("/companies")}>
              <span className="previous">&#8249;</span> All Companies
            </a>

            <h1 className="center">{state.company.name}</h1>

            <h2>Reviews</h2>

            <Summary />
            <hr />

            <UserReview />
            <hr />

            <LatestReview />
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
