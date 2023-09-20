import { FC, useState } from "react";
import "./AuthForm.css";
import image from "../../assets/auth-illustration.avif";
import { useNavigate } from "react-router-dom";
import { auth } from "../../api/auth";

export enum AuthType {
  SIGN_UP = "Sign Up",
  LOG_IN = "Log In",
}
interface AuthFormProps {
  type: AuthType;
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function getLinkText(): string {
    if (type === AuthType.SIGN_UP) {
      return "Already have an account?";
    }
    if (type === AuthType.LOG_IN) {
      return "You don't have an account?";
    }
    return "";
  }

  function updateUserData(event: any) {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function clickLink() {
    if (type === AuthType.SIGN_UP) {
      navigate("/log-in");
    }
    if (type === AuthType.LOG_IN) {
      navigate("/sign-up");
    }
  }

  function getButtonClass() {
    const color = type === AuthType.LOG_IN ? "yellow" : "blue";
    return `button_primary ${color}`;
  }

  async function submitNewUser(event: any) {
    event.preventDefault();
    console.log(user);
    const response = await auth(user, type);
    if (response.error) {
      console.log(response);
    } else {
      navigate("/companies");
    }
  }

  return (
    <div>
      <form onSubmit={submitNewUser} className="auth--container">
        <img src={image} alt="Auth illustration" className="auth--image" />

        <div className="auth--info">
          <h1>{type}</h1>
          <label htmlFor="email">
            <b>Username</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={user.email}
            onChange={updateUserData}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={user.password}
            onChange={updateUserData}
          />

          <a href="" onClick={clickLink}>
            {getLinkText()}
          </a>

          <br />
          <br />
          <button type="submit" className={getButtonClass()}>
            {type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
