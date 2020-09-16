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
import * as burgerBuilderActions from "../store/actions";

class BurgerBuilder extends Component {
  state = {
    //UI states for this component
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

  updatePurchaseableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  checkOutHandler = () => {
    this.props.history.push("/checkout");
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
            totalPrice={this.props.prc}
            purchaseable={this.updatePurchaseableHandler(this.props.ings)}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <Summary
          ingredients={this.props.ings}
          cancel={this.purchaseHandler}
          checkout={this.checkOutHandler}
          totalPrice={this.props.prc}
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
    prc: state.totalPrice,
  }
}

const mapdDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName))
  }
}

export default connect(mapStateToProps, mapdDispatchToProps)(withErrorHandler(BurgerBuilder, axios));