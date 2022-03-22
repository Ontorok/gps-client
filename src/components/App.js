import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import "../styles/App.css";
import Layout from "./Layout";
// import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Router>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout>
            <Route exact path="/" component={Home} />
          </Layout>

        </Switch>

      </Router>
    </AuthProvider>
  );
}

export default App;
