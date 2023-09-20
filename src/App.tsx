import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.css";
import Companies from "./components/companies/Companies";
import AuthForm, { AuthType } from "./components/auth-form/AuthForm";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app--main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              path="/sign-up"
              element={<AuthForm type={AuthType.SIGN_UP} />}
            />
            <Route
              path="/log-in"
              element={<AuthForm type={AuthType.LOG_IN} />}
            />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
