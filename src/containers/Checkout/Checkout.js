import React from "react";
import CheckoutSum from "../../components/Order/CheckoutSum";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueddHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const puchasedRedirect = props.prchsd ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {puchasedRedirect}
        <CheckoutSum
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinueddHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    prchsd: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
