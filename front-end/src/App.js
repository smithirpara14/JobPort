import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";
import UserLogin from "./components/userLogin";
import Logout from "./components/logout";
import RegisterForm from "./components/register";
import _404Page from "./components/404Page";
import Admin from "./components/admin";
import CreateAccountType from "./components/createAccountType";
import UpdateAccountType from "./components/updateAccountType";
import "./App.css";

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/createAccountType" element={<CreateAccountType />} />
          <Route path="/updateAccountType/:id" element={<UpdateAccountType />} />      
          <Route path="*" element={<_404Page />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
