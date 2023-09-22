import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Company.css";
import { DispatchContext, StateContext } from "../../App";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import ReviewForm from "../newReview/ReviewForm";
import { getCompany, getLatestReviews, getUserReview } from "../../api/company";
import { Action, ActionType } from "../../store/actions";
import { ICompany, IReview } from "../../store/interfaces";
import Review from "../review/Review";

const Company: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const [end, setEnd] = useState(3);

  function setCompany(company: ICompany) {
    dispatch({ type: ActionType.SET_COMPANY_DATA, payload: company });
  }

  function setLatestReviews(reviews: IReview[]) {
    dispatch({ type: ActionType.SET_LATEST_REVIEWS, payload: reviews });
  }

  function setUserReview(review: IReview) {
    dispatch({ type: ActionType.SET_USER_REVIEW, payload: review });
  }

  function goBack() {
    navigate("/companies");
    dispatch({ type: ActionType.SET_COMPANY_DATA, payload: null });
  }

  function loadMoreReviews() {
    setEnd((prevState) => prevState + 3);
  }

  useEffect(() => {
    if (!state.companyId) {
      return navigate("/companies");
    }
    getCompany(state.companyId).then((company) => setCompany(company));
    getUserReview(state.companyId).then((review) => setUserReview(review));
  }, []);

  // useEffect(() => {
  //   if (!state.companyId) {
  //     return navigate("/companies");
  //   }

  //   console.log(state.userReview);
  // }, [state.reviewForm.show]);

  useEffect(() => {
    if (!state.companyId) {
      return navigate("/companies");
    }
    getLatestReviews(state.companyId, end).then((reviews) =>
      setLatestReviews(reviews)
    );
  }, [end]);

  return (
    <div>
      {!state.reviewForm.show && state.company && (
        <>
          <img
            src={state.company.url}
            alt="Company photo"
            className="container--image"
          />

          <div className="container--info">
            <a className="blue" onClick={goBack}>
              <span className="previous">&#8249;</span> All Companies
            </a>

            <h1 className="center">{state.company.name}</h1>
            <h2>Reviews</h2>

            <Summary />
            <UserReview />

            <h3>Latest Reviews</h3>
            {state.latestReviews.map((review: IReview, index: number) => (
              <div key={review._id}>
                {index !== 0 && <hr />}
                <Review review={review} />
              </div>
            ))}

            {state.latestReviews.length === 0 && (
              <p className="small">No reviews yet.</p>
            )}

            {state.company.reviewCount > end && (
              <a className="blue bold center" onClick={loadMoreReviews}>
                Load more reviews
              </a>
            )}

            <br />
          </div>
        </>
      )}
      {state.reviewForm.show && <ReviewForm />}
    </div>
  );
};

export default Company;
