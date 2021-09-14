import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./About.css";

function About() {
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
    <div className="mainBox">
      <h1 id="aboutHeading">About This Site</h1>
    </div>
  );
}

export default About;