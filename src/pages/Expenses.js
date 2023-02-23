import React from "react";
import { useRef, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { update } from "../components/redux/Exp";
import { change, changetheme } from "../components/redux/prem";           //
import { useDispatch } from "react-redux";
import './Expcss.css';
import { CSVLink } from 'react-csv';
import CsvDownloadButton from "./CsvDownloadButton";

export const Expenses = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();
  const [prem, setPrem] = useState(false);

  const email = useSelector((state) => state.auth.email);
  const reduxdata = null;

  const data = useSelector((state) => state.expenses.data);
  const redxprem = useSelector((state)=>state.prem.premium);  //




  useEffect(() => {
    fetchData();

    console.log("refresh");
  }, []);

  const file = email.substring(0, 5);
  const fetchData = async () => {
    await axios
      .get(`https://test-api-c7d27-default-rtdb.firebaseio.com/${file}.json`)
      .then((response) => {
        dispatch(update(response.data));

        let sum = 0;
        Object.keys(response.data).map(
          (key) => (sum += Number(response.data[key].money))
        );
        if (sum > 10000) {
          setPrem(true);
        } else {
          setPrem(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activateprem = () =>{
  
    dispatch(change(true));
  }

  const toggletheme = () =>{
    dispatch(changetheme());
  }




 
                                                          /////////////////////////////

  const handledownload =  (e)=>{
    e.preventDefault();
    const headers = [
        { label: "Category", key: "category" },
        { label: "Description", key: "description" },
        { label: "Money", key: "money" }
      ];
      
      const csvData = Object.values(data).map(item => ({
        category: item.category,
        description: item.description,
        money: item.money
      }));
      console.log(csvData);

  }




  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      money: moneyRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    await axios
      .post(
        `https://test-api-c7d27-default-rtdb.firebaseio.com/${file}.json`,
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

  const handleDelete = async (key) => {
    await axios
      .delete(
        `https://test-api-c7d27-default-rtdb.firebaseio.com/${file}/${key}.json`
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


      
      
      {prem && <button onClick={activateprem}> premium</button>}
      {prem && <div className="toggle-switch">
        
        <input type="checkbox" id="mode-toggle" onClick={toggletheme}  />
        <label htmlFor="mode-toggle" className="toggle-slider" ></label>
      </div>}



  

      {prem && <CsvDownloadButton/> }
      
      
      

      <ul>
        {data &&
          Object.keys(data).map((key) => (
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
