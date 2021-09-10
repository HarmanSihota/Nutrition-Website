import Navbar from "./Navbar";
import TopPane from "./TopPane";

function Header(props) {
  return (
    <header>
      <TopPane />
      <Navbar isLoggedIn={{var: props.isLoggedIn.var, func: props.isLoggedIn.func}} />
    </header>
  );
}

export default Header;