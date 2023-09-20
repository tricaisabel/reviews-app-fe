import { useEffect } from "react";
import Card, { CardProps } from "../card/Card";
import "./Companies.css";
import { getCompanies } from "../../api/companies";

export default function Companies() {
  useEffect(() => {
    getCompanies()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);
  const cardProps: CardProps = {
    name: "Company One",
    img: "https://firebasestorage.googleapis.com/v0/b/reviews-app-9ff65.appspot.com/o/companies%2F1695060638944_mgg-vitchakorn-vBOxsZrfiCw-unsplash.jpg?alt=media&token=c109e0cf-48d3-433d-95e8-be173fdedf81",
    averageRating: 3.4,
    reviewCount: 12,
  };
  return (
    <div className="companies--container">
      <h1>Companies</h1>
      <Card {...cardProps} />
    </div>
  );
}
