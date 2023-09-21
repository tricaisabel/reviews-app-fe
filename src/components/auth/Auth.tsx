import { FC, useContext } from "react";
import "./Auth.css";
import image from "../../assets/auth-illustration.avif";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/auth";
import { Action, ActionType } from "../../store/actions";
import { StateContext, DispatchContext } from "../../App";

export const SIGN_UP = "signup";
export const LOG_IN = "login";

interface AuthFormProps {
  type: string;
}

const Auth: FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const text = type === SIGN_UP ? "Sign Up" : "Log In";
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function setEmail(email: string) {
    dispatch({ type: ActionType.SET_EMAIL, payload: email });
  }

  function setUrl(url: string) {
    dispatch({ type: ActionType.SET_URL, payload: url });
  }

  function setLoginForm(event: any) {
    const { name, value } = event.target;
    dispatch({
      type: ActionType.SET_LOGIN_FORM,
      payload: {
        name,
        value,
      },
    });
  }

  function getLinkText(): string {
    if (type === SIGN_UP) {
      return "Already have an account?";
    }
    if (type === LOG_IN) {
      return "You don't have an account?";
    }
    return "";
  }

  function getButtonClass() {
    const color = type === LOG_IN ? "background_blue" : "background_yellow";
    return `button_primary ${color}`;
  }

  function clickLink() {
    type === SIGN_UP ? navigate(`/${LOG_IN}`) : navigate(`/${SIGN_UP}`);
  }

  async function submitNewUser(event: any) {
    event.preventDefault();
    const response = await auth(state.loginForm, type);
    if (!response.error) {
      setEmail(response.email);
      setUrl(response.url);
      localStorage.setItem("email", response.email);
      localStorage.setItem("url", response.url);
      navigate("/companies");
    }
  }

  return (
    <>
      <form onSubmit={submitNewUser} className="split--container">
        <img src={image} alt="Auth illustration" className="container--image" />

        <div className="container--info">
          <h1 className="center">{text}</h1>
          <label htmlFor="email">
            <b>Username</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={state.loginForm.email}
            onChange={setLoginForm}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={state.loginForm.password}
            onChange={setLoginForm}
          />

          <a onClick={clickLink}>{getLinkText()}</a>

          <br />
          <br />
          <button type="submit" className={getButtonClass()}>
            {text}
          </button>
        </div>
      </form>
    </>
  );
};

export default Auth;
