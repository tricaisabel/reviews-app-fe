import heroImage from "../../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { Container, Row } from "reactstrap";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="justify-content-center">
      <img src={heroImage} className="hero--image" alt="products" style={{width:'45vw', height:'auto'}}/>

      </Row>

      <Row className="justify-content-center m-5" >
        <h1 style={{width:'fit-content'}}> Welcome to the knit shop!</h1>
        </Row>

        <Row className="justify-content-center">
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
            onClick={() => navigate("/products")}
          >
            Products
          </button>
        </Row>
    </Container>
  );
};

export default Hero;
