import { Link, NavLink } from "react-router-dom";
import classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.brandContainer}>
        <li>
          <Link to="/" className={classes.brand}>
            <h3>GPS</h3>
          </Link>
        </li>
      </ul>
      <ul className={classes.navigationContainer}>
        <li>
          <NavLink to={`/users`} activeClassName={classes.active}>
            User
          </NavLink>
        </li>

        <li>
          <NavLink to={`/vehicles`} activeClassName={classes.active}>
            Vehicles
          </NavLink>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
