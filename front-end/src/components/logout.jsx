import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { removeToken } from "../controllers/auth";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
    removeToken();
    navigate("/login");
    }
        , []);
    
};



export default Logout;
