import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {

  let calorieLogLink = props.isLoggedIn.var? "/calorieLog": "#";
  let aboutLink = props.isLoggedIn.var? "/about": "#";


  function LogoutButton() {
    return (
      <Link to="/login">
        <li className="log" onClick={handleLogoutClick}>Logout</li>
      </Link>
    );
  }

  function handleLogoutClick() {
    sessionStorage.setItem("jwtToken", null);
    props.isLoggedIn.func(false)
    sessionStorage.setItem("loginStatus", "0");
  }

  function LoginButton() {
    return (
      <Link to="/login">
        <li className="log" onClick={handleLoginClick}>Login</li>
      </Link>
    );
  }
  
  function handleLoginClick() {
    sessionStorage.setItem("jwtToken", null);
    props.isLoggedIn.func(false)
    sessionStorage.setItem("loginStatus", "0");
  }

  return (
    <nav>
      <ul>

        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to={calorieLogLink}>
          <li>Log your Meals</li>
        </Link>

        <Link to={aboutLink}>
          <li>About</li>
        </Link>
      
        {props.isLoggedIn.var? <LogoutButton />: <LoginButton />}

      </ul>
    </nav>
  );
}

export default Navbar;