import { FC, useContext } from "react";
import star from "../../assets/logo.png";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../store/state.interface";
import { Action, ActionType } from "../../store/actions";
import { DispatchContext } from "../../App";

const Card: FC<IProduct> = (product: IProduct) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  const newBadge = <div className="card--badge">NEW</div>;
  const excellentBadge = (
    <div className="card--badge background_yellow">EXCELLENT</div>
  );

  function selectProduct() {
    dispatch({ type: ActionType.CHANGE_COMPANY, payload: product._id });
    localStorage.setItem("productId", product._id);
    navigate(`${product._id}`);
  }

  return (
    <div className="card" onClick={selectProduct}>
      {product.reviewCount === 0 && newBadge}
      {product.averageRating >= 4.5 && excellentBadge}

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
      <p className="black small bold">{product.name}</p>
    </div>
  );
};

export default Card;
