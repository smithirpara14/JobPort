import React from "react"
import { Placeholder } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const userLogin = () => {
    return (
        <div className="login">
            <h1>Login Form</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} Placeholder="Email" name="" id="" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} Placeholder="Email" name="" id="" />
                <input type="submit" />
            </form>

            <br />
            <p>Link</p>
            <br />

            <link to= "/signup"> SignUp page </link>
        </div>
    );
};

export default userLogin;