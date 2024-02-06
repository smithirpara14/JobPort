import "./App.css";
import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import UserLogin from "./components/userLogin"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />

      <Router>
        <Routes>
          <Route path="/login" element= { <UserLogin/> }/>         
        </Routes>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
