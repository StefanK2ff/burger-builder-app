import React, { Component } from "react";
import Aux from "../hoc/Aux";
import BurgerPreview from "../components/Burger/BurgerPreview";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import Summary from "../components/Burger/Summary/Summary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler";

import { connect } from "react-redux";
import * as actionTypes from "./../store/actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.5,
  bacon: 2,
  meat: 3,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get("ingredients.json")
    //   .then((resp) => {
    //     this.setState({ ingredients: resp.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({error: true})
    //   });
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
    const params = [];
    for (let i in this.state.ingredients) {
        params.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    params.push("price=" + this.state.totalPrice)
    
    const queryString = params.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burgerArea = this.state.error ? <p>Sorry, we're closed.</p> : <Spinner />;

    if (this.props.ings) {
      burgerArea = (
        <Aux>
          <BurgerPreview ingredients={this.props.ings} />
          <BuildControls
            addIngredients={this.props.onIngredientAdded}
            removeIngredients={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <Summary
          ingredients={this.props.ings}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

const mapdDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
  }
}

export default connect(mapStateToProps, mapdDispatchToProps)(withErrorHandler(BurgerBuilder, axios));