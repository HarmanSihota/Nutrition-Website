import Navbar from "./Navbar";

function Header(props) {
  return (
    <header>
      <Navbar isLoggedIn={{var: props.isLoggedIn.var, func: props.isLoggedIn.func}} />
    </header>
  );
}

export default Header;