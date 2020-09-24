import React, { Component } from "react";
import CheckoutSum from "../../components/Order/CheckoutSum";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueddHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const puchasedRedirect = this.props.prchsd ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {puchasedRedirect}
          <CheckoutSum
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinueddHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    prchsd: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
