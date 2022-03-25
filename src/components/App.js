import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Users from "../pages/Users";
import "../styles/App.css";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <Switch>
    //       <Route exact path="/login" component={Login} />
    //       <Layout>
    //         <PrivateRoute exact path="/" component={Home} />
    //         <PrivateRoute exact path="/users" component={Users} />
    //       </Layout>
    //     </Switch>
    //   </AuthProvider>
    // </Router>

    <Router>
      <AuthProvider>
        <PublicRoute exact path="/login" component={Login} />
        <Layout>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/users" component={Users} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
