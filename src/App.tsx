import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.css";
import Companies from "./components/companies/Companies";
import Auth, { LOG_IN, SIGN_UP } from "./components/auth/Auth";
import Company from "./components/company/Company";
import { Dispatch, createContext, useReducer } from "react";
import NewReview from "./components/newReview/NewReview";
import { reducer } from "./store/reducer";
import { Action } from "./store/actions";
import { IState } from "./store/interfaces";
import { initialState } from "./store/intialState";
import Toast from "./components/toast/Toast";

export const StateContext = createContext<IState>(initialState);
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
            <Toast />
          </div>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
