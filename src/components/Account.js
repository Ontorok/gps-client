import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { setAuthUser } from '../redux/actions/Auth';
import classes from "../styles/Account.module.css";

export default function Account() {
  const { authUser } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(setAuthUser(null));
    localStorage.removeItem('loggedIn')
  }

  return (
    <div className={classes.accountContainer}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      <span>
        <Link to={`/profile`}>{authUser?.name}</Link>
      </span>

      <span className="material-icons-outlined" title="Logout" onClick={onLogout}>
        logout
      </span>
    </div>
  );
}
