import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";
import UserLogin from "./components/userLogin";
import Logout from "./components/logout";
import RegisterForm from "./components/register";
import UserProfile from "./components/userProfile";
import _404Page from "./components/404Page";
import Admin from "./components/admin";
import CreateUser from "./components/createUser";
import CreateAccountType from "./components/createAccountType";
import UpdateAccountType from "./components/updateAccountType";
import JobPostList from "./components/employer_jobpost/jobPostList";
import ViewJobPost from "./components/employer_jobpost/viewJobPost";
import CreateJobPost from "./components/employer_jobpost/createJobPost";
import UpdateJobPost from "./components/employer_jobpost/editJobPost";
import PrivateRoute from "./components/privateRoute";


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
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/createUser"
            element={
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/createAccountType"
            element={
              <PrivateRoute>
                <CreateAccountType />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateAccountType/:id"
            element={
              <PrivateRoute>
                <UpdateAccountType />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobposts"
            element={
              <PrivateRoute>
                <JobPostList />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobposts/:id"
            element={
              <PrivateRoute>
                <ViewJobPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobposts/edit/:id"
            element={
              <PrivateRoute>
                <UpdateJobPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobposts/create"
            element={
              <PrivateRoute>
                <CreateJobPost />
              </PrivateRoute>
            }
          />
          {/* <Route path="/jobposts/" element={<FeaturedJobList />} /> */}
          <Route path="*" element={<_404Page />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
