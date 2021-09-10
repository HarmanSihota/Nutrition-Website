import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react"
import Home from "./Home"
import Header from "./Header/Header";
import Login from "./Login";
import About from "./About";
import CalorieLog from "./CalorieLog"
import CreateAccount from "./CreateAccount"
import Footer from "./Footer"
import "./App.css";

function App() {
  const storedLoginStatus = Number(localStorage.getItem("loginStatus"));
  const [ isLoggedIn, setIsLoggedIn ] = useState(storedLoginStatus);

  return (
    <Router>
      <div>
        <Header isLoggedIn={{var: isLoggedIn, func: setIsLoggedIn}} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" render={(props)=> <Login {...props} isLoggedIn={{var: isLoggedIn, func: setIsLoggedIn}} /> } />
          <Route path="/calorieLog" component={CalorieLog} />
          <Route path="/about" component={About} />
          <Route path="/createAccount" component={CreateAccount} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;