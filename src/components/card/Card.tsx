import { FC, useContext } from "react";
import star from "../../assets/logo.png";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../store/state.interface";
import { Action, ActionType } from "../../store/actions";
import { DispatchContext, StateContext } from "../../App";
import { Row, Col, Button } from "reactstrap";
import { deleteProduct, getProducts } from "../../api/product";

export type Props = {
  product: IProduct;
  toggle: () => void;
};
const Card: FC<Props> = ({ product, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  const state = useContext(StateContext);

  function selectProduct() {
    dispatch({ type: ActionType.CHANGE_COMPANY, payload: product._id });
    localStorage.setItem("productId", product._id);
    navigate(`${product._id}`);
  }

  function onDeleteProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${product.name}?`
      ) === true
    ) {
      deleteProduct(product._id);
      dispatch({
        type: ActionType.DELETE_PRODUCT,
        payload: { productId: product._id },
      });
    }
  }

  return (
    <div className="card" onClick={selectProduct}>
      {product.discount && (
        <div className="card--badge background_gray card--badge-position">
          {product.discount}% OFF
        </div>
      )}

      <div className="card--image--container">
        <img src={product.url} alt={product.name} className="card--image" />
      </div>

      <div className="card--stats text">
        <img src={star} alt="star" className="card--star" />
        <span className="bold">{product.averageRating}</span>
        <span className="gray">
          ({product.reviewCount} review{product.reviewCount !== 1 && "s"})
        </span>
      </div>

      <Row>
        <Col>
          <p className="black m-2">{product.name}</p>
        </Col>

        <Col className="col-auto" size="xs">
          <p className="black m-2">
            <b>{product.price} EUR</b>
          </p>
        </Col>
      </Row>

      <Row>
        {state.user.isAdmin === true && (
          <>
            <Col>
              <Button
                outline
                color="danger"
                onClick={(e) => onDeleteProduct(e)}
              >
                Delete
              </Button>
              <Button
                outline
                color="primary"
                className="m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                  dispatch({
                    type: ActionType.SET_EDIT_PRODUCT,
                    payload: { product: product },
                  });
                }}
              >
                Edit
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Card;
