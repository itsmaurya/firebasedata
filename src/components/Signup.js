import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import fireDb from "./Fire";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [arr, setArr] = useState({});
  const [obj, setObj] = useState({
    Name: "",
    Contact: "",
    Email: "",
    Password: "",
    EmpId: "",
    JoinDate: "",
    Profile: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("EmplyeeData").on("value", (snapshot) => {
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
        EmpId: "",
        JoinDate: "",
        Profile: "",
      });
    }

    return () => {
      setObj({
        Name: "",
        Contact: "",
        Email: "",
        Password: "",
        EmpId: "",
        JoinDate: "",
        Profile: "",
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
      obj.Password === "" ||
      obj.EmpId === "" ||
      obj.JoinDate === "" ||
      obj.Profile === ""
    ) {
      toast.warning("Please enter the all the value first", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      if (!id) {
        fireDb.child("EmplyeeData").push(obj, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Employee Details Saved Successfully", {
              autoClose: 2000,
              position: toast.POSITION.TOP_CENTER,
            });
            setObj({
              Name: "",
              Contact: "",
              Password: "",
              Email: "",
              EmpId: "",
              JoinDate: "",
              Profile: "",
            });
          }
        });
      } else {
        fireDb.child(`Data/${id}`).set(obj, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Updated Details", {
              autoClose: 2000,
              position: toast.POSITION.TOP_CENTER,
            });
            setObj({
              Name: "",
              Contact: "",
              Password: "",
              Email: "",
              EmpId: "",
              JoinDate: "",
              Profile: "",
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
              {id ? "Update Details" : "Employee Registrastion"}
              <ion-icon name="log-in-outline"></ion-icon>
            </h3>

            <div className="inputDetails">
              <div className="username">
                <label htmlFor="name">
                  <ion-icon name="person-circle"></ion-icon>
                </label>
                <input
                  value={obj.Name || ""}
                  type="text"
                  name="Name"
                  placeholder="Employee Name"
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

              <div className="employeeid">
                <label htmlFor="passw">
                  <ion-icon name="id-card-sharp"></ion-icon>
                </label>
                <input
                  value={obj.EmpId || ""}
                  type="text"
                  name="EmpId"
                  placeholder="Employee Id"
                  onChange={handleInputChange}
                />
              </div>
              <div className="post">
                <label htmlFor="post">
                  <ion-icon name="briefcase-sharp"></ion-icon>
                </label>
                <input
                  value={obj.Profile || ""}
                  type="text"
                  name="Profile"
                  placeholder="Work Profile"
                  onChange={handleInputChange}
                />
              </div>
              <div className="date">
                <label htmlFor="date">
                  <ion-icon name="calendar-sharp"></ion-icon> Joining Date
                </label>
                <input
                  type="date"
                  name="JoinDate"
                  value={obj.Date || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button className="btn2" onClick={handleSubmit}>
              <ion-icon name="log-in-outline"></ion-icon>
              {id ? "Update" : "Submit"}
            </button>
            <h6 className="link-to-register">
              Already a Employee? <Link to="/login">Login here</Link>
            </h6>
            <div className="foot">
              <a href="https://github.com/itsmaurya">
                <i className="fa fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/mauryaavi550">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/thisis_avimaurya/ ">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
