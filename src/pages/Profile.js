import React, { useEffect, useRef,useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const navigate = useNavigate();
  const [isIncomplete,setIncomplete] = useState(false);

 useEffect(()=>{

    const getDefaultProfile = async () => {
        let id = window.localStorage.getItem("email");
        let url = `https://test-api-c7d27-default-rtdb.firebaseio.com/${id}.json`;
        const data = await fetch(url)
          .then((response) => response.json())
          .then((data) => {
           
            name.current.value = data.name;
            email.current.value = data.email;
            phone.current.value = data.phone;
            console.log("fetched", data);
            if(data.phone =="" || data.name =="" || data.email=="")
            {
                setIncomplete(true);
            }
         
          });
      };
      getDefaultProfile();


 },[isIncomplete]);
  



  const submithandler = async () => {
    const data = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
    };

    const response = await fetch(
      `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem(
        "email"
      )}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIncomplete((state)=>!state);
    const result = await response.json();
   
    console.log("success",result);
  };

  return (
    <Card>
        {isIncomplete && <h1>incomplete profile</h1>}
      <div>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={name} />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={email} />
      </div>

      <div>
        <label htmlFor="phone">Your Phone number</label>
        <input type="text" id="phone" ref={phone} />
      </div>
      <div>
        <button onClick={submithandler}>Update</button>
      </div>
    </Card>
  );
};
