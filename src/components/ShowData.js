import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ShowData.css";
import fireDb from "./Fire";
import { toast } from "react-toastify";


export const ShowData = () => {
  const [id,setId]=useState("")
  const navigate =useNavigate();
  const params = useParams();
  var [arr, setArr] = useState({});
  
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
          toast.success("Successfully Completed",{ autoClose: 2000 ,position: toast.POSITION.TOP_CENTER})
        }
      })
    }
  }
  
  
  function change(key){
    const user =Object.keys(arr).find((user,index) => index === key);
    
        setId(user)
  }
  
  return (
    <div className="body">
      <div className="contain">
        <h2>Welcome at Employee Management {params.id}</h2>

        {id && (
          <div className='box'>
            
            <div className="details">
            <h2 className='box-name'>{arr[id].Name} </h2>
            <p className='box-phone'>Job Profile : {arr[id].Profile}</p>
          <p className='box-email'>Employee Id : {arr[id].EmpId}</p>
          <p className='box-phone'>Joining Date : {arr[id].JoinDate}</p>
          <p className='box-email'>Email : {arr[id].Email}</p>
          <p className='box-phone'>Contact : {arr[id].Contact}</p>
            </div>
          </div>
        )}

        <div className='data' >
         {Object.keys(arr).map((user, index) => (
        <div className='data-box' key={index} onClick={()=>change(index)}>
          
          <p className='name'>{arr[user].Name}</p>
          <p className='phone'>Job Profile : {arr[user].Profile}</p>
          {/* <p className='email'>Employee Id : {arr[user].EmpId}</p>
          <p className='phone'>Joining Date : {arr[user].JoinDate}</p>
          <p className='email'>Email : {arr[user].Email}</p>
          <p className='phone'>Contact : {arr[user].Contact}</p> */}
          <div className="box-btn">
          <button className="dlt-btn" onClick={Edit} id={user}>Update</button>
          <button className="updt-btn" onClick={deleteItems} id={user}>Delete</button> 
          <button className="dlt-btn" onClick={change} id={index}>View</button> 
          </div>
          <hr />
        </div>
      ))}
    </div>
        
        <div className="home">
        <Link to="/">
          <button className="homeBtn">Back to Home</button>
        </Link>
        </div>
      </div>
    </div>
  );
};
