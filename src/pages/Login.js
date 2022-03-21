import Illustration from "../components/Illustration";
import LoginForm from "../components/LoginForm";

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
