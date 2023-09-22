import { useContext, useEffect } from "react";
import Card from "../card/Card";
import "./Companies.css";
import { getCompanies } from "../../api/company";
import { useNavigate } from "react-router-dom";
import { Action, ActionType } from "../../store/actions";
import { StateContext, DispatchContext } from "../../App";
import { ICompany } from "../../store/interfaces";

export default function Companies() {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;

  function setCompanies(companies: ICompany[]) {
    dispatch({ type: ActionType.SET_COMPANIES, payload: companies });
  }

  useEffect(() => {
    getCompanies().then((companies) => {
      setCompanies(companies);
    });
  }, []);

  return (
    <div className="main--container">
      <a className="blue" onClick={() => navigate("/")}>
        <span className="previous">&#8249;</span> Home
      </a>
      <h1 className="center">Companies</h1>

      <div className="companies--list">
        {state.companies.map((company: ICompany) => (
          <Card key={company._id} {...company} />
        ))}
      </div>
    </div>
  );
}
