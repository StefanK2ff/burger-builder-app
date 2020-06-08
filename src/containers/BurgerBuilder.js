import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import Summary from "./../components/Burger/Summary/Summary"

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
    purchaseable: false,
    purchasing: false
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const newTotal = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newTotal, ingredients: updatedIngredients });
    this.updatePurchaseableHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    if (updatedIngredients[type] > 0) {
      updatedIngredients[type] = updatedIngredients[type] - 1;
      const newTotal = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({ totalPrice: newTotal, ingredients: updatedIngredients });
    }
    this.updatePurchaseableHandler(updatedIngredients);
  };

  updatePurchaseableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  purchaseHandler = ()  => {
      this.setState({purchasing: !this.state.purchasing})
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
            show={this.state.purchasing}
            clicked={this.purchaseHandler}
            >
            <Summary ingredients={this.state.ingredients}/>
        </Modal>
        <BurgerPreview ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientHandler}
          removeIngredients={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
