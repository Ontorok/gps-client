import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import TextInput from "../../components/TextInput";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin@mail.com");
  const history = useHistory();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    history.push("/");
    login(email, password);
  }

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter username"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        required
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">
        <span>Submit Now</span>
      </Button>
    </Form>
  );
}
