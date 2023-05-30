import React, { useState } from "react";

import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  var [arr, setArr] = useState(JSON.parse(localStorage.getItem("SignUp")));
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const user = arr.find((user) => user.Name === name && user.Password === password);
    if (user) {
      // setName("")
      // setPassword("")
      navigate(`/data/${e.target.id}`);
    }
    else {
      alert("Invalid credentials");
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
              New User? <Link to="/">Register here</Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}
