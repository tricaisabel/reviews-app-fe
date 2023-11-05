import { useContext, useEffect } from "react";
import Card from "../card/Card";
import "./Products.css";
import { getProducts } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { Action, ActionType } from "../../store/actions";
import { StateContext, DispatchContext } from "../../App";
import { IProduct } from "../../store/state.interface";

export default function Products() {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function setProducts(products: IProduct[]) {
    dispatch({ type: ActionType.SET_COMPANIES, payload: products });
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

  useEffect(() => {
    getProducts(showToastMessage, navigate).then((products) => {
      if (products) setProducts(products);
    });
  }, []);

  return (
    <div className="products--container">
      <a className="blue" onClick={() => navigate("/")}>
        <span className="previous">&#8249;</span> Home
      </a>
      <h1 className="center">Products</h1>

      <div className="products--list">
        {state.products.length &&
          state.products.map((product: IProduct) => (
            <Card key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
}
