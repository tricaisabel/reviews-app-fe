import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { DispatchContext, StateContext } from "../../App";
import { Summary } from "./Summary";
import { UserReview } from "./UserReview";
import ReviewForm from "../review-form/ReviewForm";
import {
  getProduct,
  getLatestReviews,
  getUserReview,
  addProductToCart,
} from "../../api/product";
import { Action, ActionType } from "../../store/actions";
import { IProduct, IReview } from "../../store/state.interface";
import Review from "../review/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown,faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Input, Row, Card, Container } from "reactstrap";

const Product: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const [end, setEnd] = useState(3); // how many reviews are displayed
  const [viewReviews, setViewReviews] = useState(false);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

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

  function toggleReviews() {
    setViewReviews((prevState) => !prevState);
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
    getProduct(state.productId, showToastMessage).then((product) =>
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
    <Container fluid style={{width:'80vw'}}>
      <div className="prev--button">
        <a className="blue" onClick={goBack}>
          <span className="previous">&#8249;</span> All Products
        </a>
      </div>

      {!state.reviewForm.show && state.product && (
        <div className="flex">
          <img
            src={state.product.url}
            alt="Product photo"
            className="container--image"
          />

          <div className="container--info">
            {/* Product Description */}
            <div className="product--row flex">
              <h1>{state.product.name}</h1>
              <div className="flex product--price">
                <h1>{state.product.price} €</h1>

                {state.product.discount && (
                  <p>
                    <small>{`(${state.product.discount}% discount)`}</small>
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              {state.product.tags.map((tag, index) => (
                <div className="card--badge background_gray " key={index}>
                  {tag}
                </div>
              ))}
            </div>

            <p>Composition: {state.product.composition}</p>

            {/* Add to cart */}
            <hr />
            <Row className="align-items-end">
              <Col>
                <h3>Size</h3>
                <Input type="select" onChange={(e)=>setSize(e.target.value)} value={size}>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((s, index) => (
                    <option key={index}>
                      {s}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col>
                <h3>Quantity</h3>
                <Input
                  color="secondary"
                  value={quantity}
                  type="number"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                ></Input>
              </Col>

              <Col>
                <Button
                  color="primary"
                  className="background_blue"
                  onClick={() =>{
                    addProductToCart(
                      state.product?._id,
                      quantity,
                      size,
                      showToastMessage
                    )
                  }}
                >
                  Add to cart
                </Button>
              </Col>
            </Row>

            {/* Product Reviews */}
            <hr />
            <h3>Reviews</h3>

            <Summary
              viewAllReviews={() => setEnd(state.product?.reviewCount ?? 0)}
            />
            <UserReview />

            <div className="flex product--row">
              <h3>Latest Reviews</h3>
              <div onClick={toggleReviews}>
                {viewReviews ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </div>
            </div>

            {viewReviews &&
              state.latestReviews.map((review: IReview, index: number) => (
                <div key={review._id}>
                  {index !== 0 && <hr />}
                  <Review review={review} />
                </div>
              ))}

            {state.latestReviews.length === 0 && (
              <p className="small">No reviews yet.</p>
            )}

            {viewReviews && state.product.reviewCount > end && (
              <a className="blue bold center" onClick={loadMoreReviews}>
                Load more reviews
              </a>
            )}

            <br />
          </div>
        </div>
      )}
      {state.reviewForm.show && <ReviewForm />}
    </Container>
  );
};

export default Product;
