import { FC, useContext } from "react";
import "./Header.css";
import { logout } from "../../api/auth";
import { StateContext } from "../../App";

const Header: FC = () => {
  const state = useContext(StateContext);
  return (
    <header className="header">
      <h3>Company Review</h3>

      {state.url && state.email && (
        <>
          <div className="header--profile">
            <img
              src={state.url}
              alt="Profile image"
              className="profile--image"
            />
            <p className="white">
              {state.email?.slice(0, state.email.indexOf("@"))}
            </p>
          </div>

          <div className="header--logout">
            <a href="/" onClick={logout}>
              <p className="white">Log out</p>
            </a>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
