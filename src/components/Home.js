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
    <div className="body">
      <div className="home-contain">
        <button className="registerbtn" onClick={register}>New User</button>
        <button className="loginbtn" onClick={login}>Login</button>
      </div>
    </div>
  );
};
