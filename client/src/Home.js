import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import backgroundImg from "./pexels-ella-olsson-1640777.jpg";
import "./Home.css";

function Home() {

  return (
    <div>
      <img className="backgroundImg" src={backgroundImg} alt="" />
      <h1 className="hook">Looking To Improve Your Diet? Live a Healthier Lifestyle?</h1>
    </div>
  );
}

export default Home;