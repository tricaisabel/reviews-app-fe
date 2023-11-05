import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { DispatchContext, StateContext } from "../../App";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import ReviewForm from "../review-form/ReviewForm";
import { getProduct, getLatestReviews, getUserReview } from "../../api/product";
import { Action, ActionType } from "../../store/actions";
import { IProduct, IReview } from "../../store/state.interface";
import Review from "../review/Review";

const Product: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const [end, setEnd] = useState(3); // how many reviews are displayed

  function setProduct(product: IProduct) {
    dispatch({ type: ActionType.SET_COMPANY_DATA, payload: product });
  }

  function setLatestReviews(reviews: IReview[]) {
    dispatch({ type: ActionType.SET_LATEST_REVIEWS, payload: reviews });
  }

  function setUserReview(review: IReview) {
    dispatch({ type: ActionType.SET_USER_REVIEW, payload: review });
  }

  function goBack() {
    navigate("/products");
    dispatch({ type: ActionType.SET_COMPANY_DATA, payload: null });
  }

  function loadMoreReviews() {
    setEnd((prevState) => prevState + 3);
  }

  const showToastMessage = (message: string) => {
    dispatch({
      type: ActionType.SHOW_TOAST,
      payload: message,
    });

    setTimeout(() => {
      dispatch({ type: ActionType.HIDE_TOAST });
    }, 3000);
  };

  // get the user's review on the first render
  useEffect(() => {
    if (!state.productId) {
      return navigate("/products");
    }
    getUserReview(state.productId).then((review) => {
      if (review) setUserReview(review);
    });
  }, []);

  // get the product info on first render and when userReview changes
  useEffect(() => {
    if (!state.productId) {
      return navigate("/products");
    }
    getProduct(state.productId, showToastMessage, navigate).then((product) =>
      setProduct(product)
    );
  }, [state.userReview]);

  // get the latest reviews on first render and when end changes
  useEffect(() => {
    if (!state.productId) {
      return navigate("/products");
    }
    getLatestReviews(state.productId, end).then((reviews) => {
      if (reviews) setLatestReviews(reviews);
    });
  }, [end]);

  return (
    <div>
      {!state.reviewForm.show && state.product && (
        <>
          <img
            src={state.product.url}
            alt="Product photo"
            className="container--image"
          />

          <div className="container--info">
            <a className="blue" onClick={goBack}>
              <span className="previous">&#8249;</span> All Products
            </a>

            <h1 className="center">{state.product.name}</h1>
            <h2>Reviews</h2>

            <Summary
              viewAllReviews={() => setEnd(state.product?.reviewCount ?? 0)}
            />
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

            {state.product.reviewCount > end && (
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

export default Product;
