import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react"
import Home from "./Home"
import Header from "./Header/Header";
import Login from "./Login";
import About from "./About";
import CalorieLog from "./CalorieLog"
import CreateAccount from "./CreateAccount"
import "./App.css";

function App() {
  const storedLoginStatus = Number(sessionStorage.getItem("loginStatus"));
  const [ isLoggedIn, setIsLoggedIn ] = useState(storedLoginStatus);
  const [username, setUsername ] = useState(sessionStorage.getItem("username"));

  return (
    <Router>
      <div>
        <Header isLoggedIn={{var: isLoggedIn, func: setIsLoggedIn}} />
        <Switch>
          <Route path="/" render={(props)=> <Home {...props} isLoggedIn={{var: isLoggedIn, func: setIsLoggedIn}} /> } exact />
          <Route path="/login" render={(props)=> <Login {...props} isLoggedIn={{var: isLoggedIn, func: setIsLoggedIn}} user={{var: username, func: setUsername}}/>} />
          <Route path="/calorieLog" render={(props)=> <CalorieLog {...props} user={{var:username, func: setUsername}} /> } />
          <Route path="/about" component={About} />
          <Route path="/createAccount" component={CreateAccount} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;