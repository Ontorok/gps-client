import signupImage from "../assets/images/login.svg";
import classes from "../styles/Illustration.module.css";

export default function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={signupImage} alt="Login" />
    </div>
  );
}
