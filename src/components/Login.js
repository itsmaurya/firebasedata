import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fireDb from "./Fire";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  var [arr, setArr] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    fireDb.child("EmplyeeData").on("value",(snapshot)=>{
      if (snapshot.val() !== null){
        setArr({...snapshot.val()})
      }
      else{
        setArr({})
      }
    })
    return ()=>{
      setArr({});
    }
  },[])
  
  // useEffect(()=>{
  //   setArr(JSON.parse(localStorage.getItem("SignUp")))
  // },[])
  function handleLogin(e) {
    e.preventDefault();
    const user = Object.keys(arr).find((key) => {
      const userData = arr[key];
      return userData.Name === name && userData.Password === password;
    });
    
    if (user) {
      // setName("")
      // setPassword("")
      navigate(`/data/${e.target.id}`);
    }
    else {
      toast.error('Invalid credentials', { autoClose: 2000 ,position: toast.POSITION.TOP_CENTER})
    }
  }
  return (
    <div className="body">
      <div className="container">
        <div className="login-form">
          <form className="login">
            <h3 className="head">
              <ion-icon name="log-in-outline"></ion-icon> LOG IN
            </h3>
            <div className="userid">
              <label htmlFor="Name">
                <ion-icon name="person-circle-outline"></ion-icon>{" "}
              </label>
              <input type="text"
               name="name"
               id="name"
               placeholder="User..." 
               onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="userpassword">
              <label htmlFor="passw">
                <ion-icon name="lock-closed"></ion-icon>
              </label>
              <input
                type="password"
                name="Password"
                id="passw"
                placeholder="Password...."
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <button className="btn" type="submit" onClick={handleLogin} id={name}>
              Login<ion-icon name="log-in-outline"></ion-icon>
            </button>
            <h6 className="link-to-register">
              New User? <Link to="/signup">Register here</Link>
            </h6>

            <div className="foot">
              <a href="https://github.com/itsmaurya" >
                <i className="fa fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mauryaavi550"
                
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/thisis_avimaurya/ "
                
              >
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer  />
    </div>
  );
}
