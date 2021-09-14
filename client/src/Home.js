import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import backgroundImg from "./pexels-ella-olsson-1640777.jpg";
import "./Home.css";

function Home(props) {
  let getStarted = props.isLoggedIn.var? "/calorieLog": "/login";

  return (
    <div id="homeDiv">
      <h1 className="hook" id="topHook">Improve Your Diet</h1>
      <p className="middleHook" id="middleHook1">Easily log and track your calories so you can visualize your health better</p>
      <p className="middleHook" id="middleHook2">Get suggestions for meals you may like based on your preferences</p>
      <Link to={getStarted}> 
        <p className="middleHook" id="middleHook3">Get started here</p>
      </Link>
      <h1 id="bottomHook" className="hook"> Live a Healthier Lifestyle</h1>

      <div>
        {/* describe and show preview of one feautre here */ }
      </div>

      <div>
        {/* describe and show preview of another feautre here */}
      </div>
    </div>
  );
}

export default Home;