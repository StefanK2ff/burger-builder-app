import React, { useEffect, Suspense } from "react";
import Layout from "./components/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  let routes = (
    //default routes
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthed) {
    routes = (
      //routes if logged in
      <Switch>
        <Route path="/checkout" render={ () => <Checkout />} />
        <Route path="/orders" component={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={ () => <Auth />} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout><Suspense fallback={<p>Loading ....</p>}>{routes}</Suspense></Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
