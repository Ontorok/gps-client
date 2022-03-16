import { useHistory } from "react-router-dom";
import classes from "../styles/Account.module.css";



export default function Account() {

  const history = useHistory()
  return (
    <div className={classes.account}>
      <>
        <span className="material-icons-outlined" title="Account">
          account_circle
        </span>
        <span>nasir</span>
        <span
          className="material-icons-outlined"
          title="Logout"
          onClick={() => history.goBack()}
        >

          logout
        </span>

      </>
    </div>
  );
}
