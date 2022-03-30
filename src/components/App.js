import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import Vehicles from "../pages/Vehicles";
import VehiclesCreateForm from "../parts/vehicles/VehiclesCreateForm";
import "../styles/App.css";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PublicRoute exact path="/login" component={Login} />
        <Layout>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/vehicles" component={Vehicles} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/new-vehicles" component={VehiclesCreateForm} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
