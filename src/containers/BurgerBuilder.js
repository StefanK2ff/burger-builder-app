import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import Summary from "../components/Burger/Summary/Summary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler";
import burgerPreview from "../components/Burger/BurgerPreview";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.5,
  bacon: 2,
  meat: 3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("ingredients.json")
      .then((resp) => {
        this.setState({ ingredients: resp.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({error: true})
      });
  }

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
  };

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  checkOutHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, //normally: recalculate price on server
      customer: {
        name: "Bob Ross",
        address: {
          stree: "Streetington 2",
          zipCode: "1234",
          city: "Barcelona",
        },
        email: "bob@bob.bob",
      },
      deliveryMethod: "express",
    };
    axios
      .post("orders.json", order)
      .then((resp) => {
        console.log(resp);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burgerArea = this.state.error ? <p>Sorry, we're closed.</p> : <Spinner />;

    if (this.state.ingredients) {
      burgerArea = (
        <Aux>
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
      orderSummary = (
        <Summary
          ingredients={this.state.ingredients}
          cancel={this.purchaseHandler}
          checkout={this.checkOutHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burgerArea}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
