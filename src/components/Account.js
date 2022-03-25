import useAuth from "../hooks/useAuth";
import classes from "../styles/Account.module.css";

export default function Account() {
  const { authUser, logout } = useAuth();

  return (
    <div className={classes.accountContainer}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      <span>{authUser?.name}</span>

      <span className="material-icons-outlined" title="Logout" onClick={logout}>
        logout
      </span>
    </div>
  );
}
