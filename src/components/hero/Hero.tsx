import heroImage from "../../assets/hero.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src={heroImage} className="hero--image" alt="companies" />

      <div className="hero--main">
        <span className="hero--title">
          <img src={logo} className="hero--icon" alt="star icon" />
          <h1 className="primary"> Review your experiences</h1>
        </span>

        <p className="secondary">
          Join the team of expert reviewers and help us find the best spots.
        </p>

        <button className="button_primary" onClick={() => navigate("/sign-up")}>
          All Companies
        </button>

        <button
          className="button_primary"
          onClick={() => navigate("/sign-up")}
        ></button>
      </div>
    </div>
  );
}
