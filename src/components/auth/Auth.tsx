import { FC, useContext, useRef } from "react";
import image from "../../assets/login.jpg";
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
  const repeatPasswordInput = useRef<HTMLInputElement | null>(null);

  function setEmail(email: string) {
    dispatch({ type: ActionType.SET_EMAIL, payload: email });
  }

  function setUrl(url: string) {
    dispatch({ type: ActionType.SET_URL, payload: url });
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
    if (
      type === SIGN_UP &&
      state.loginForm.password !== repeatPasswordInput.current?.value
    ) {
      return showToastMessage("Passwords do not match.");
    }
    await auth(
      state.loginForm,
      type,
      setUrl,
      setEmail,
      navigate,
      showToastMessage
    );
  }

  return (
    <>
      <form onSubmit={submitNewUser}>
        <img src={image} alt="Auth illustration" className="container--image" />

        <div className="container--info">
          <h1 className="center">{text}</h1>
          <label htmlFor="email">
            <b>Email</b>
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

          {type === SIGN_UP && (
            <>
              <label htmlFor="repeat">
                <b>Repeat Password</b>
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeat"
                required
                onChange={setLoginForm}
                ref={repeatPasswordInput}
              />
            </>
          )}
          <a className="blue" onClick={clickLink}>
            {getLinkText()}
          </a>

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
