import { useEffect, useState } from "react";
import Card, { ICompany } from "../card/Card";
import "./Companies.css";
import { getCompanies } from "../../api/company";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies().then((response) => {
      if (!response.error) {
        setCompanies(response);
        console.log(response);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="main--container">
      <a className="blue" onClick={() => navigate("/")}>
        <span className="previous">&#8249;</span> Home
      </a>
      <h1 className="center">Companies</h1>

      <div className="companies--list">
        {companies.map((company) => (
          <Card key={company._id} {...company} />
        ))}
      </div>
    </div>
  );
}
