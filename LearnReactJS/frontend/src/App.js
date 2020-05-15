import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { Provider } from "react-redux";
import configureStore from "./store";
import auth from "./common/auth";
import Login from "./views/Login/Login";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect from="/" to="/redux-form" />
      )
    }
  />
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // auth.isAuthenticated() ? (
        <DefaultLayout {...props} />
      // ) : (
      //   <Redirect from="/" to="/login" />
      // )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Provider store={configureStore(this.props)}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <UnauthenticatedRoute
                exact
                path="/login"
                name="Login"
                component={Login}
              />
              <AuthenticatedRoute
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
