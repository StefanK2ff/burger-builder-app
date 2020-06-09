import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "./../../UI/Button/Button";

export default class Summary extends Component {
//   componentDidUpdate() {
//       console.log("[Summary] componentDidUpdate")
//   }

  render() {
    const ingSummary = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
          {this.props.ingredients[key]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order is ${this.props.totalPrice.toFixed(2)}</h3>
        <p>The following ingredients were selected:</p>
        <ul>{ingSummary}</ul>
        <Button btnType="Secondary" click={this.props.cancel}>
          Cancel
        </Button>
        <Button btnType="Primary" click={this.props.checkout}>
          Continue to Checkout
        </Button>
      </Aux>
    );
  }
}
