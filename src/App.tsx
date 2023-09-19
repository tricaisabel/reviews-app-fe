import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import './App.css'
import SignUp from "./components/sign-up/SignUp";

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
      
      <Hero/>
    </div>
  );
}

export default App;
