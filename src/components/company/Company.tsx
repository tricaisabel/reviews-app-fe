import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCompanyStats,
  getLatestReviews,
  getUserReview,
} from "../../api/company";
import { ICompany } from "../card/Card";
import "./Company.css";
import Review, { IReview } from "../review/Review";
import StarRating from "../star-rating/StarRating";

const USER_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/reviews-app-9ff65.appspot.com/o/users%2Fanonymous-avatar-icon-25.jpg?alt=media&token=bd1f7e5b-b1bf-4411-b649-f3b542a0a005";

const Company: FC = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const [company, setCompany] = useState<ICompany>();
  const [userReview, setUserReview] = useState<IReview>();
  const [latestReviews, setLatestReviews] = useState<IReview[]>([]);
  const [end, setEnd] = useState(3);

  useEffect(() => {
    if (!companyId) {
      return navigate("/");
    }
    getCompanyStats(companyId)
      .then((response) => {
        console.log(response);
        setCompany(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [userReview]);

  useEffect(() => {
    if (!companyId) {
      return navigate("/");
    }
    getUserReview(companyId)
      .then((response) => {
        if (!response.error) {
          setUserReview(response);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!companyId) {
      return navigate("/");
    }
    getLatestReviews(companyId, end)
      .then((response) => {
        setLatestReviews(response);
      })
      .catch((error) => console.log(error));
  }, [end]);

  function loadMoreReviews() {
    setEnd((prevState) => prevState + 3);
  }

  function openNewReview() {
    navigate(`/companies/${companyId}/new`);
  }

  return (
    <div>
      {company && (
        <>
          <img
            src={company.url}
            alt="Company photo"
            className="container--image"
          />

          <div className="container--info">
            <a className="blue" onClick={() => navigate("/companies")}>
              <span className="previous">&#8249;</span> All Companies
            </a>

            <h1 className="center">{company.name}</h1>

            <h2>Reviews</h2>

            <div className="summary--info">
              <div className="rating--box bold">{company.averageRating}</div>

              <p className="small summary--counter">
                from {company.reviewCount} review
                {company.reviewCount > 0 && "s"}
              </p>

              {latestReviews.length > 0 && (
                <a
                  className="blue right"
                  onClick={() => setEnd(company.reviewCount)}
                >
                  View all reviews
                </a>
              )}
            </div>

            <hr />
            <h3>Your Review</h3>

            {userReview && <Review {...userReview} />}

            {!userReview && (
              <div className="review--container">
                <img
                  src={USER_IMAGE}
                  alt="Reviewer image"
                  className="profile--image"
                />

                <div className="review--details" onClick={openNewReview}>
                  <h3>Rate and review</h3>
                  <p className="small">Share your experience to help others.</p>
                  <StarRating />
                </div>
              </div>
            )}

            <hr />
            <h3>Latest Reviews</h3>
            {latestReviews.map((review, index) => (
              <>
                {index !== 0 && <hr />}
                <Review key={review._id} {...review} />
              </>
            ))}

            {end < company.reviewCount && (
              <a className="blue bold center" onClick={loadMoreReviews}>
                Load more reviews
              </a>
            )}

            {end >= company.reviewCount && latestReviews.length > 0 && (
              <a className="blue bold center" onClick={() => setEnd(3)}>
                Show top review
              </a>
            )}

            {latestReviews.length === 0 && (
              <p className="small">
                No reviews yet. You can be our first reviewer.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
