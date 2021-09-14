import { useState, useEffect, useImperativeHandle } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./CalorieLog.css";

function CalorieLog() {
  const [ redirect, setRedirect ] = useState(null);
  const [ mealName, setMealName ] = useState("");
  const [ calorieEntry, setCalorieEntry] = useState("");

  function handleChange(event) {
    const {name, value} = event.target;
    if(name === "mealName") setMealName(value);
    else if(name === "calorieEntry") setCalorieEntry(value);
  }

  async function handleSubmit() {
    try {
      let response = await axios.post("/mealEntry", {
        mealName: mealName,
        calorieEntry: calorieEntry
      })

      //check if response is success 
    } catch(error) {
      throw error;
    }
  }

  async function checkToken() {
    let response = await axios.post("/checkAuth", {
      token: localStorage.getItem("jwtToken")
    });

    if(response.data !== "success") setRedirect("/login");
  }

  useEffect( () => {
    checkToken();
   }, []);

  if(redirect) {
    return <Redirect to={redirect} />
  } 

  return (
    <div>
      <div className="mainBox" id="calorieLogBox1">
        <div id="inputPanel">
          <h1 id="calorieInputMsg">Enter your meal here</h1>
          <form>
        <label>
          <input
            id="mealName"
            placeholder="Enter your meal"
            type="text"
            name="mealName"
            className="formInput"
            value={mealName}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          <input 
            id="calorieEntry"
            placeholder="Enter calories here"
            type="text"
            name="calorieEntry"
            className="formInput"
            value={calorieEntry}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
      </form>
      <button type="submit" className="formButton" id="mealButton" onClick={handleSubmit}>Submit</button>
        </div>
        <div id="resultsPanel">
          Display past meal entry information gotten from database
        </div>
      </div>
    </div>
  );
}

export default CalorieLog;