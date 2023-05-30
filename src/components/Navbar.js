import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [obj, setObj] = useState({
    Name: "",
    Address: "",
    Phone: "",
  });
  
  var [arr, setArr] = useState(JSON.parse(localStorage.getItem("key")));

  function store(e) {
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  }

  function save() {
        if (arr == null) {
      arr = [];
    }
    setArr([...arr, obj]);
  }
  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(arr));

    setObj({
      Name: "",
      Phone: "",
      Address: "",
    });
  }, [arr]);
  return (
    <div>
      <input
        value={obj.Name}
        onChange={store}
        type="text"
        name="Name"
        placeholder="name"
      />
      <input
        value={obj.Address}
        onChange={store}
        type="text"
        name="Address"
        placeholder="address"
      />
      <input
        value={obj.Phone}
        onChange={store}
        type="text"
        name="Phone"
        placeholder="phone"
      />
      <button onClick={save}>Save</button>
      <br /> <br />
      <Link to="/data">
        {" "}
        <button>Show</button>
      </Link>
    </div>
  );
}
