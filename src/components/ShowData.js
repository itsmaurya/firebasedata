import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ShowData.css";
import fireDb from "./Fire";


export const ShowData = () => {
  const navigate =useNavigate();
  const params = useParams();
  var [arr, setArr] = useState({});
  
  useEffect(()=>{
    fireDb.child("Data").on("value",(snapshot)=>{
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
  
  function Edit(e){
    navigate(`/update/${e.target.id}`)

  }
  function deleteItems(e) {
    if (window.confirm("You want to delete ?")) {
      fireDb.child(`Data/${e.target.id}`).remove((err)=>{
        if(err){
          alert(err)
        }
        else{
          alert("Success")
        }
      })
    }
  }
  function view(e){
    
    navigate(`/view/${e.target.id}`)

  }
  return (
    <div className="body">
      <div className="contain">
        <h2>Welcome at AdminPanel  {params.id}</h2>
       
        <table border="3">
          <thead>
            <tr>
              <th className="serialN">Serial No.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th className="operation">Operation</th>
            </tr>
          </thead>
          <tbody id="bdy">
            { Object.keys(arr).map(function (obj, index) {
                  return (
                    <tr key={obj}>
                      <td>{index + 1}</td>
                      <td>{arr[obj].Name}</td>
                      <td>{arr[obj].Contact} </td>
                      <td>{arr[obj].Email} </td>
                      <td>
                        <button onClick={deleteItems} id={obj}>
                          Delete
                        </button>
                        <button onClick={Edit} id={obj}>Edit</button>
                        <button onClick={view} id={index}>View</button>
                      </td>
                    </tr>
                  );
                })
              }
          </tbody>
              
        </table>
        <div className="home">
        <Link to="/">
          <button className="homeBtn">Back to Home</button>
        </Link>
        </div>
      </div>
    </div>
  );
};
