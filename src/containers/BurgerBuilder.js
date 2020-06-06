import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";
import BuildControls from "../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.5,
  bacon: 2,
  meat: 3,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const newTotal = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newTotal, ingredients: updatedIngredients})
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    if(updatedIngredients[type] > 0 ) {
        updatedIngredients[type] = updatedIngredients[type] - 1;
        const newTotal = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newTotal, ingredients: updatedIngredients})
    }
  };

  render() {
      const disabledInfo = {
          ...this.state.ingredients
      }
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
          
      }
    return (
      <Aux>
        <BurgerPreview ingredients={this.state.ingredients} />
        <BuildControls 
            addIngredients={this.addIngredientHandler} 
            removeIngredients={this.removeIngredientHandler}
            disabled={disabledInfo}
            />
      </Aux>
    );
  }
}
