import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: null,
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueddHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidlMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //workaround for now
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  render() {
    return (
      <div>
        <CheckoutSum
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueddHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          //way to call a component in "ROUTE" but with additional props
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props} // to pass the history props down
            />
          )}
        />
      </div>
    );
  }
}
