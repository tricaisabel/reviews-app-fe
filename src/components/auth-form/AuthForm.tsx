import { FC, useState } from "react";
import "./AuthForm.css";
import image from "../../assets/auth-illustration.avif";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "Sign Up" | "Log In";
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function getLinkText(): string {
    if (type === "Sign Up") {
      return "Already have an account?";
    }
    if (type === "Log In") {
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
    if (type === "Sign Up") {
      navigate("/log-in");
    } else if (type === "Log In") {
      navigate("/sign-up");
    }
  }

  function submitNewUser(event: any) {
    event.preventDefault();
    console.log(user);
  }

  return (
    <div>
      <form onSubmit={submitNewUser} className="auth--container">
        <img src={image} alt="Auth illustration" />

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

          <button type="submit" className="button_primary">
            {type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
