import React, { useEffect, useRef,useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const Profile = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [data, setData] = useState(null);


  const email = useSelector((state)=>state.auth.email);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://test-api-c7d27-default-rtdb.firebaseio.com/${email.substring(0,5)}profile.json`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };

    axios
      .put(
        `https://test-api-c7d27-default-rtdb.firebaseio.com/${email.substring(0,5)}profile.json`,
        data
      )
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
         {!(data?.name && data?.email && data?.phone)&& (
        <h1>incomplete Profile.</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={nameRef} defaultValue={data?.name} />
        </label>
        <label>
          Email:
          <input type="email" ref={emailRef} defaultValue={data?.email} />
        </label>
        <label>
          Phone:
          <input type="tel" ref={phoneRef} defaultValue={data?.phone} />
        </label>
        <button type="submit">Submit</button>
      </form>
   
    </div>
  );
};
