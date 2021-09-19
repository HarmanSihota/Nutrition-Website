import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./About.css";

function About() {
  const [ redirect, setRedirect ] = useState(null);

  async function checkToken() {
    let response = await axios.post("/checkAuth", {
      token: sessionStorage.getItem("jwtToken")
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
      <p className="aboutMsg">Welcome to Nutrition Tracker! This site is made to help you track your calories and improve your heating habits.</p>
      <p className="aboutMsg">To get started on tracking your meals, click on "Log your Meals" at the top of this page. Here you will be able to enter a meal and its calories.
        Your 10 most recent meals, their calories, and date of entry will be shown to help you keep track of your recent meal history.
      </p>
      <p className="aboutMsg">There will also soon be an option to allow this site to track your meal entries and make your health journey 
      easier by suggesting healthy meals you can incorporate in your diet.</p>
      <p className="aboutMsg">If you have any feedback or questions please contact me at harmansihota17@gmail.com</p>
      <p className="aboutMsg">Happy Tracking!</p>
    </div>
  );
}

export default About;