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
import CheckAccountTypes from "./components/Admin/checkAccountTypes";
import CheckUsers from "./components/Admin/checkUsers";
import CheckJobPosts from "./components/Admin/checkJobPosts";
import CreateUser from "./components/createUser";
import CreateAccountType from "./components/createAccountType";
import UpdateAccountType from "./components/updateAccountType";
import EMP_Home from "./components/employer_jobpost/home";
import EMP_JobPostList from "./components/employer_jobpost/jobPostList";
import EMP_ViewJobPost from "./components/employer_jobpost/viewJobPost";
import EMP_CreateJobPost from "./components/employer_jobpost/createJobPost";
import EMP_UpdateJobPost from "./components/employer_jobpost/editJobPost";
import JS_JobPostList from "./components/jobseeker_jobpost/jobPostList";
import JS_ViewJobPost from "./components/jobseeker_jobpost/viewJobPost";
import JS_ViewSavedJobPost from "./components/jobseeker_jobpost/viewSavedPost";
import About from "./components/about";
import PrivateRoute from "./components/privateRoute";

import "./App.css";
import { isAuthenticated, isEmployer } from "./controllers/auth";

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated() && isEmployer() ? <EMP_Home /> : <Home />

          } />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<PrivateRoute component={Logout} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={UserProfile} />}
          />
          <Route path="/admin" element={<PrivateRoute component={Admin} />} />
          <Route path="/about" element={<PrivateRoute component={About} />} />
          <Route
            path="/createUser"
            element={<PrivateRoute component={CreateUser} />}
          />
          <Route
            path="/createAccountType"
            element={<PrivateRoute component={CreateAccountType} />}
          />
          <Route
            path="/updateAccountType/:id"
            element={<PrivateRoute component={UpdateAccountType} />}
          />

          {/* Recruiter Job Post Routes */}
          <Route
            path="/recruiter/jobposts"
            element={<PrivateRoute component={EMP_JobPostList} />}
          />
          <Route
            path="/recruiter/jobposts/:id"
            element={<PrivateRoute component={EMP_ViewJobPost} />}
          />
          <Route
            path="/recruiter/jobposts/edit/:id"
            element={<PrivateRoute component={EMP_UpdateJobPost} />}
          />
          <Route
            path="/recruiter/jobposts/create"
            element={<PrivateRoute component={EMP_CreateJobPost} />}
          />

          {/* Job Seeker (Cadidate) Job Post Routes */}
          <Route path="/jobposts" element={<PrivateRoute component={JS_JobPostList} />} />
          <Route path="/jobposts/:id" element={<PrivateRoute component={JS_ViewJobPost} />} />
          <Route path="/myjobs" element={<JS_ViewSavedJobPost />} />

          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/checkAccountTypes" element={<CheckAccountTypes />} />
          <Route path="/admin/checkUsers" element={<CheckUsers />} />
          <Route path="/admin/checkJobPosts" element={<CheckJobPosts />} />

          {/* Invalid Route */}
          <Route path="*" element={<_404Page />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
