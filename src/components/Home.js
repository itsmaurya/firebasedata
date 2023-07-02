import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  function register(){
    navigate('/signup')
  }
  function login(){
    navigate('/login')
  }
  return (
   <>
   
    <div className="body">
      <div className="home-contain">
        <div className="blur">
        <button className="registerbtn" onClick={register}>Add New Employee</button>
        <button className="loginbtn" onClick={login}>Login</button>
        </div>
      </div>
    </div>
   </>
  );
};
