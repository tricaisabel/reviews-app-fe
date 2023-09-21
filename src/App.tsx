import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.css";
import Companies from "./components/companies/Companies";
import Auth, { LOG_IN, SIGN_UP } from "./components/auth/Auth";
import Company from "./components/company/Company";
import { Dispatch, createContext, useReducer, useState } from "react";
import NewReview from "./components/new-review/NewReview";
import { reducer, State } from "./reducers/app.reducer";
import { Action } from "./reducers/action.type";

const initialState: State = {
  email: localStorage.getItem("email") ?? "",
  url: localStorage.getItem("url") ?? "",
  rating: 0,
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="app-container">
          <Header />

          <div className="app--main">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="signup" element={<Auth type={SIGN_UP} />} />
                <Route path="login" element={<Auth type={LOG_IN} />} />
                <Route path="companies" element={<Companies />} />
                <Route path="companies/:companyId" element={<Company />} />
                <Route
                  path="companies/:companyId/new"
                  element={<NewReview />}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
