import { useState } from "react";
import { useDispatch } from 'react-redux';
import Button from "../../components/Button";
import Form from "../../components/Form";
import TextInput from "../../components/TextInput";
import { AuthApi } from "../../constants/apiEndPoints";
import { setAuthUser } from '../../redux/actions/Auth';
import { axiosInstance } from "../../services/config";

export default function LoginForm() {
  const [username, setUserName] = useState("admin");
  const [password, setPassword] = useState("admin@mail.com");
  const dispatch = useDispatch();


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(AuthApi.login, { username, password })
      localStorage.setItem('loggedIn', 'loggedIn')
      dispatch(setAuthUser(res.data.data))
    } catch (err) {

    }

    //dispatch(setAuthUser(obj))
  }

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter username"
        icon="alternate_email"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
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
