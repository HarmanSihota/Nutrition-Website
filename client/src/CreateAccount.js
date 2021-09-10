import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./CreateAccount.css";

function CreateAccount() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ redirect, setRedirect ] = useState(null);
  const [ error, setError ] = useState(null);

  function handleChange(event) {
    const {name, value} = event.target;
    if(name === "username") setUsername(value);
    else if(name === "password") setPassword(value);
    else if(name === "email") setEmail(value);
  }

  async function handleSubmit() {
    try {
      let response = await axios.post("/register", {
        username: username,
        password: password,
        email: email
      });

      if(response.data === "User created") setRedirect("/login");
      else if(response.data === "Username already exists") setError("This username already exists. Please try again");
      else setError("Something went wrong, please try again later");

    } catch(error) {
        throw error;
    }
}

  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="registerBox">
      <h1>Registration</h1>
      <p>Please enter your information below</p>
      <form>
        <label>
          <input
            className="username"
            type="text"
            name="username" 
            value={username}
            placeholder="Username" 
            onChange={handleChange} 
          />
        </label>
        <br />

        <label>
          <input 
            className="password"
            type="password" 
            name="password"
            value={password}
            placeholder="Password" 
            onChange={handleChange} 
          />
        </label>
        <br />

        <label>
          <input 
            className="email"
            type="text" 
            name="email"
            value={email}
            placeholder="Email" 
            onChange={handleChange} 
          />
        </label>

        <br />
        <br />
      </form>

      <button type="submit" onClick={handleSubmit}>Register</button>
      <p className="errorMsg">{error}</p>

    </div>
  );
}

export default CreateAccount;