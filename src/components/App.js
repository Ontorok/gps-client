import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Club from "../pages/Club";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import Vehicles from "../pages/Vehicles";
import VehiclesCreateForm from "../parts/vehicles/VehiclesCreateForm";
import configureStore, { history } from "../redux/store";
import "../styles/App.css";
import AppWrapper from "./AppWrapper";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppWrapper>
          <Router>
            <PublicRoute exact path="/login" component={Login} />
            <Layout>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/users" component={Users} />
                <PrivateRoute exact path="/club" component={Club} />
                <PrivateRoute exact path="/vehicles" component={Vehicles} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute
                  exact
                  path="/new-vehicles"
                  component={VehiclesCreateForm}
                />
                {/* <PublicRoute exact path="/login" component={Login} /> */}
              </Switch>
            </Layout>
          </Router>
        </AppWrapper>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
