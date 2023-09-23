import heroImage from "../../assets/hero.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero--container">
      <img src={heroImage} className="hero--image" alt="companies" />

      <div className="hero--main">
        <span className="hero--title">
          <img src={logo} className="hero--icon" alt="star icon" />
          <h1 className="hero--primary"> Review your experiences</h1>
        </span>

        <p className="hero--secondary">
          Join the team of expert reviewers and help us find the best spots.
        </p>

        <div className="hero--buttons">
          <button
            className="button_primary background_yellow"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>

          <button
            className="button_primary background_blue"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            className="button_primary background_blue"
            onClick={() => navigate("/companies")}
          >
            Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
