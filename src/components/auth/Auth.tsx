import { FC, useContext, useState } from "react";
import "./Auth.css";
import image from "../../assets/auth-illustration.avif";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/auth";
import { Action, SET_EMAIL, SET_URL } from "../../reducers/action.type";
import { StateContext, DispatchContext } from "../../App";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";

interface AuthFormProps {
  type: string;
}

const Auth: FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const text = type === SIGN_UP ? "Sign Up" : "Log In";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function setEmail(email: string) {
    dispatch({ type: SET_EMAIL, payload: email });
  }

  function setUrl(url: string) {
    dispatch({ type: SET_URL, payload: url });
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

  function updateFormData(event: any) {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function getButtonClass() {
    const color = type === LOG_IN ? "background_blue" : "background_yellow";
    return `button_primary ${color}`;
  }

  function clickLink() {
    type === SIGN_UP ? navigate("/login") : navigate("/signup");
  }

  async function submitNewUser(event: any) {
    event.preventDefault();
    const response = await auth(form, type);
    if (!response.error) {
      setEmail(response.email);
      setUrl(response.url);
      localStorage.setItem("email", response.email);
      localStorage.setItem("url", response.url);
      navigate("/companies");
    }
  }

  return (
    <div>
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
            value={form.email}
            onChange={updateFormData}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={form.password}
            onChange={updateFormData}
          />

          <a onClick={clickLink}>{getLinkText()}</a>

          <br />
          <br />
          <button type="submit" className={getButtonClass()}>
            {text}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
