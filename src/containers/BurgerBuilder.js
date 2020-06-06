import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            meat: 4
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
