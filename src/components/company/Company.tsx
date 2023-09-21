import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Company.css";
import { StateContext } from "../../App";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import { LatestReview } from "./LatestReviews";

const Company: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);

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
