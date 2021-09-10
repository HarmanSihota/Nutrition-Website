import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function CalorieLog() {
  const [ redirect, setRedirect ] = useState(null);

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
      calorieLog
    </div>
  );
}

export default CalorieLog;