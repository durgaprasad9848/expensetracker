import React from "react";
import { useRef,useState,useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
 
export const Expenses = () =>{

    const moneyRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const [data, setData] = useState({});
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios
        .get("https://test-api-c7d27-default-rtdb.firebaseio.com/temp.json")
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
        money: moneyRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
  
      axios
        .post(
          "https://test-api-c7d27-default-rtdb.firebaseio.com/temp.json",
          data
        )
        .then((response) => {
          console.log(response);
          moneyRef.current.value = "";
          descriptionRef.current.value = "";
          categoryRef.current.value = "";
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleUpdate = (key) => {
        moneyRef.current.value = data[key].money;
        descriptionRef.current.value = data[key].description;
        categoryRef.current.value = data[key].category;
        handleDelete(key);
 
    };
  
    const handleDelete = (key) => {
      axios
        .delete(
          `https://test-api-c7d27-default-rtdb.firebaseio.com/temp/${key}.json`
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
        <form onSubmit={handleSubmit}>
          <label>
            Money:
            <input type="text" ref={moneyRef} />
          </label>
          <label>
            Description:
            <input type="text" ref={descriptionRef} />
          </label>
          <label>
            Category:
            
            <select ref={categoryRef}>
                    <option value={"Food"}>Food</option>
                    <option value={"Petrol"}>Petrol</option>
                    <option value={"Travel"}>Traveling</option>
                    <option value={"Movies"}>Movies</option>
                </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {Object.keys(data).map((key) => (
            <li key={key}>
              {data[key].money}, {data[key].description}, {data[key].category}
              <button onClick={() => handleUpdate(key)}>Update</button>
              <button onClick={() => handleDelete(key)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };