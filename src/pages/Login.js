import Illustration from "../parts/login/Illustration";
import LoginForm from "../parts/login/LoginForm";
import classes from "../styles/Login.module.css";

export default function Login() {
  return (
    <div className={classes.login}>
      <h1 style={{ textAlign: "center" }}>Login to your account</h1>
      <div className="column">
        <Illustration />
        <LoginForm />
      </div>
    </div>
  );
}
