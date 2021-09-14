import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";


function Login(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ redirect, setRedirect ] = useState(null);
  const [ incorrectLogin, setIncorrectLogin] = useState(null);
  const [refresh, setRefresh] = useState(null);

  async function checkNoToken(isMounted) {
    let response = await axios.post("/checkAuth", {
      token: localStorage.getItem("jwtToken")
    });

    if(response.data === "success" && isMounted) {
      props.isLoggedIn.func(true);
      localStorage.setItem("loginStatus", "1");
      setRedirect("/");
    }
  }

  useEffect(() => {
    let isMounted = true; // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    checkNoToken(isMounted);
    return () => { isMounted = false }; 
  });

  function handleChange(event) {
    const {name, value} = event.target;
    if(name === "username") setUsername(value);
    else if(name === "password") setPassword(value);
  }

  async function handleSubmit(event) {
    try {
      let response = await axios.post("/login", {
        username: username,
        password: password
      });

      if(response.data === "incorrect password" || response.data === "invalid username") setIncorrectLogin("invalid username/password");
      else {
        localStorage.setItem("jwtToken", response.data.accessToken);
        setRefresh("refresh");
      }

    } catch(error) {
        console.log(error);
        throw error;
    }
  }

  if(redirect === "/") {
    return <Redirect to={redirect} />
  } 

  return (
    <div className="loginBox">
      <h1 id="loginMsg">Please login below</h1>

      <form>
        <label>
          <input
            id="username"
            className="formInput"
            type="text"
            name="username" 
            value={username}
            placeholder="Login Id" 
            onChange={handleChange} 
          />
        </label>
        <br />

        <label>
          <input 
            id="password"
            className="formInput"
            type="password" 
            name="password"
            value={password}
            placeholder="Password" 
            onChange={handleChange} 
          />
        </label>
        <br />
        <br />
      </form>
      <button type="submit" onClick={handleSubmit} className="formButton">Login</button>

      <p className="errorMsg">{incorrectLogin? incorrectLogin: ""}</p>

      <Link to="/createAccount">
        <p className="registerMsg">Don't have an account? Make one here</p>
      </Link>
    </div>
  );
}

export default Login;