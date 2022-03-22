import Illustration from "../parts/login/Illustration";
import LoginForm from "../parts/login/LoginForm";

export default function Signup() {
  return (
    <div style={{ padding: '4rem', width: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>Login to your account</h1>
      <div className="column">
        <Illustration />
        <LoginForm />
      </div>
    </div>
  );
}
