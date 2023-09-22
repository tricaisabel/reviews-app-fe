import { FC, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Company.css";
import { DispatchContext, StateContext } from "../../App";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import { LatestReview } from "./LatestReviews";
import ReviewForm from "../newReview/ReviewForm";
import { getCompany, getUserReview } from "../../api/company";
import { Action, ActionType } from "../../store/actions";
import { ICompany, IReview } from "../../store/interfaces";

const Company: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const { companyId } = useParams();
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function setCompany(company: ICompany) {
    dispatch({ type: ActionType.SET_COMPANY, payload: company });
  }

  function setUserReview(review: IReview) {
    dispatch({ type: ActionType.SET_USER_REVIEW, payload: review });
  }

  useEffect(() => {
    if (!companyId) {
      return navigate("/companies");
    }
    getCompany(companyId, setCompany);
    getUserReview(companyId, setUserReview);
  }, [companyId]);

  return (
    <div>
      {state.company && !state.reviewForm.show && (
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
            <UserReview />
            <LatestReview />
          </div>
        </>
      )}
      <ReviewForm />
    </div>
  );
};

export default Company;
