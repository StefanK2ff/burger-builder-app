import React, { Component } from "react";
import Aux from "./../../hoc/Aux";
import BurgerPreview from "../../components/Burger/BurgerPreview";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import Summary from "./../../components/Burger/Summary/Summary";
import Spinner from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../hoc/withErrorHandler";
import axios from "./../../axios-orders";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

export class BurgerBuilder extends Component {
  state = {
    //UI states for this component
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
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
    if (this.props.isAuthed) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirPath("/checkout");
      this.props.history.push("/auth");
    }
    
  };

  checkOutHandler = () => {
    this.props.onInitPurchase();
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

    let burgerArea = this.props.err ? <p>Sorry, we're closed.</p> : <Spinner />;

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
            isAuthed={this.props.isAuthed}
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
    ings: state.burgerBuilder.ingredients,
    prc: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
    isAuthed: state.auth.token !== null,
  }
}

const mapdDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirPath: (targetUrl) => dispatch(actions.authRedir(targetUrl))
  }
}

export default connect(mapStateToProps, mapdDispatchToProps)(withErrorHandler(BurgerBuilder, axios));