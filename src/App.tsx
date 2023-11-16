import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.css";
import Products from "./components/products/Products";
import Auth, { LOG_IN, SIGN_UP } from "./components/auth/Auth";
import Product from "./components/product/Product";
import { Dispatch, createContext, useReducer } from "react";
import { reducer } from "./store/reducer";
import { Action } from "./store/actions";
import { IState } from "./store/state.interface";
import { initialState } from "./store/intialState";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faAngleDown,
  faCloud,
  faRightFromBracket,
  faCartShopping,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./components/cart/Cart";
import ToastComponent from "./components/toast/Toast";
import { Row, Card } from "reactstrap";
import StripeContainer from "./components/cart/StripeContainer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

library.add(
  faAngleUp,
  faAngleDown,
  faCloud,
  faRightFromBracket,
  faCartShopping,
  faTrash
);

export const StateContext = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stripeTestPromise = loadStripe('pk_test_51OCpwXKSKB1YkBfrQgmz1RFtuuwHKjFDulGBNuZbebQ5aVVJjzMiqlGlIxx5bQmmsnb2VtbPBRHJX6OdUt9bsSeM00zQihE86U')

  return (
    <Elements stripe={stripeTestPromise}>
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Header />
        <Row className="justify-content-center" style={{ marginTop: "100px" }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="signup" element={<Auth type={SIGN_UP} />} />
                <Route path="login" element={<Auth type={LOG_IN} />} />
                <Route path="products" element={<Products />} />
                <Route path="shopping-cart" element={<Cart />} />
                <Route path="checkout" element={<StripeContainer />} />
                <Route path="products/:productId" element={<Product />} />
              </Routes>
            </BrowserRouter>
        </Row>
        <Row className="justify-content-center">
          <ToastComponent />
        </Row>
      </DispatchContext.Provider>
    </StateContext.Provider>
    </Elements>

  );
}

export default App;
