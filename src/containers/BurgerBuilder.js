import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        }
    }
  render() {
    return (
      <Aux>
        <BurgerPreview ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Aux>
    );
  }
}
