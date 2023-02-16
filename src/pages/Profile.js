import React, { useRef } from "react";
import { Card } from "react-bootstrap";

export const Profile = () => {
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);

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
    const result = await response.json();
    console.log("success",result);
  };

  return (
    <Card>
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
