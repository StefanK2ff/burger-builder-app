import React, { Component } from "react";
import Layout from "./components/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import async from "./hoc/async";

const asyncCheckout = async(() => {
  return import("./containers/Checkout/Checkout")
});

const asyncAuth = async(() => {
  return import("./containers/Auth/Auth")
});

const asyncOrders = async(() => {
  return import("./containers/Orders/Orders")
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      //default routes
      <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
            </Switch>
    );

    if (this.props.isAuthed) {
      routes = (
        //routes if logged in
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
            </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
