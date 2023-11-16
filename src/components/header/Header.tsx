import { FC, useContext } from "react";
import "./Header.css";
import { logout } from "../../api/auth";
import { StateContext } from "../../App";
import {
  faCartShopping,
  faCloud,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "reactstrap";

const Header: FC = () => {
  const state = useContext(StateContext);
  return (
    <header className="header">
      <Col >
        <FontAwesomeIcon icon={faCloud} />
        <span className="m-2">Knit Shop</span>
      </Col>

      {state.user && (
        <>
           <Col size="xs" className="col-auto">
            <img
              src={state.user.url}
              alt="Profile image"
              className="profile--image"
            />
            <span className="m-2">{state.user.email} {state.user.isAdmin === true  && '(admin)'}</span>
          </Col>

          <Col size="xs" className="col-auto m-3" >
            <Col>
              <FontAwesomeIcon icon={faCartShopping} />
            <a href="/shopping-cart">
              <span className="white m-2">Shopping Cart</span>
            </a>
            </Col>
            
          </Col>

          <Col size="xs" className="col-auto m-3">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <a href="/" onClick={logout}>
              <span className="white m-2">Log out</span>
            </a>
          </Col>
        </>
      )}
    </header>
  );
};

export default Header;
