import { useState, useEffect, useImperativeHandle } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./CalorieLog.css";

function CalorieLog(props) {
  const [ redirect, setRedirect ] = useState(null);
  const [ mealName, setMealName ] = useState("");
  const [ calorieEntry, setCalorieEntry] = useState("");
  const [ refresh, setRefresh ] = useState(null);
  const [ mealHistory, setMealHistory ] = useState([]);

  function getDate() {
    let d = new Date(Date.now());
    let date = [];
    date.push(d.getFullYear());
    date.push(d.getMonth());
    date.push(d.getDate());
    date.push(d.getHours());
    date.push(d.getMinutes());
    date.push(d.getSeconds());

    for(let i = 0; i < date.length; i++) {
      if(date[i] < 10) {
        date[i] = "0" + date[i];
      }
    }

    return `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
  }

  function createTable() {
    let rows = [];
    for(let i = 0; i < mealHistory.length; i++){
      rows.push(
        <tr>
          <td>{mealHistory[i].entry_date}</td>
          <td>{mealHistory[i].entry_name}</td>
          <td>{mealHistory[i].entry_calories}</td>
        </tr>
      );
    }

    return (
      <table>
        <tbody>
          <tr>
            <th>Date and Time</th>
            <th>Meal</th>
            <th>Calories</th>
          </tr>
         {rows}
        </tbody>
      </table>
    );
  }

  function handleChange(event) {
    const {name, value} = event.target;
    if(name === "mealName") setMealName(value);
    else if(name === "calorieEntry") setCalorieEntry(value);
  }

  async function handleSubmit() {
    try {
      await axios.post("/mealEntry", {
        username: props.user.var,
        entry_name: mealName,
        entry_calories: calorieEntry,
        entry_date: getDate()
      })
      
      if(!refresh) setRefresh("refresh");
      else setRefresh(null);

    } catch(error) {
      throw error;
    }
  }

  async function checkToken() {
    try {
      let response = await axios.post("/checkAuth", {
        token: sessionStorage.getItem("jwtToken")
      });

      if(response.data !== "success") setRedirect("/login");
    } catch(error) {
      throw error;
    }
  }

  async function getUserMealHistory() {
    try {
      let response = await axios.post("/mealHistory", {
        username: props.user.var
      });
      setMealHistory(response.data);
      console.log(response.data);
    } catch(error) {
      throw error;
    }
  }

  useEffect( () => {
    checkToken();
   }, []);

  useEffect( () => {
    getUserMealHistory();
  }, [refresh]);

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
          <h1 id="mealHistoryMsg">Meal History</h1>
          {createTable()}
        </div>
      </div>
    </div>
  );
}

export default CalorieLog;