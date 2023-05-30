import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import fireDb from "./Fire";

export default function Signup() {
  const [arr, setArr] = useState({});
  const [obj, setObj] = useState({
    Name: "",
    Contact: "",
    Email: "",
    Password: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("Data").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setArr({ ...snapshot.val() });
      } else {
        setArr({});
      }
    });
    return () => {
      setArr({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setObj({ ...arr[id] });
    } else {
      setObj({
        Name: "",
        Contact: "",
        Email: "",
        Password: "",
      });
    }

    return () => {
      setObj({
        Name: "",
        Contact: "",
        Email: "",
        Password: "",
      });
    };
  }, [id, arr]);

  function handleInputChange(e) {
    setObj({ ...obj, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      obj.Name === "" ||
      obj.Contact === "" ||
      obj.Email === "" ||
      obj.Password === ""
    ) {
      alert("Please enter the all the value first");
      return;
    } else {
      if (!id) {
        fireDb.child("Data").push(obj, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Save");
            setObj({
              Name: "",
              Contact: "",
              Password: "",
              Email: "",
            });
          }
        });
      } else {
        fireDb.child(`Data/${id}`).set(obj, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Update");
            setObj({
              Name: "",
              Contact: "",
              Password: "",
              Email: "",
            });
          }
        });
      }
    }
  }

  return (
    <div className="body">
      <div className="container ">
        <div className="register">
          <form className="register-form">
            <h3 className="head">
            {id ?"Update":"Signup"}<ion-icon name="log-in-outline"></ion-icon>
            </h3>

            <div className="username">
              <label htmlFor="name">
                <ion-icon name="person-circle"></ion-icon>
              </label>
              <input
                value={obj.Name || ""}
                type="text"
                name="Name"
                placeholder="Your Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="contact">
              <label htmlFor="contact">
                <ion-icon name="call"></ion-icon>
              </label>
              <input
                value={obj.Contact || ""}
                type="contact"
                name="Contact"
                placeholder="Contact"
                onChange={handleInputChange}
              />
            </div>

            <div className="emailid">
              <label htmlFor="email">
                <ion-icon name="mail"></ion-icon>
              </label>
              <input
                value={obj.Email || ""}
                type="text"
                name="Email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>

            <div className="password">
              <label htmlFor="passw">
                <ion-icon name="lock-closed"></ion-icon>
              </label>
              <input
                value={obj.Password || ""}
                type="password"
                name="Password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>

            <button className="btn2" onClick={handleSubmit}>
              <ion-icon name="log-in-outline"></ion-icon>{id ?"Update":"Signup"}
            </button>
            <h6 className="link-to-register">
              Have an Account? <Link to="/login">Login here</Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}
