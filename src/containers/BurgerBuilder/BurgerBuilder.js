import React, { useState, useEffect } from "react";
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

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  },[]);

  const updatePurchaseableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthed) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirPath("/checkout");
      props.history.push("/auth");
    }
  };

  const checkOutHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burgerArea = props.err ? <p>Sorry, we're closed.</p> : <Spinner />;

  if (props.ings) {
    burgerArea = (
      <Aux>
        <BurgerPreview ingredients={props.ings} />
        <BuildControls
          addIngredients={props.onIngredientAdded}
          removeIngredients={props.onIngredientRemoved}
          disabled={disabledInfo}
          totalPrice={props.prc}
          purchaseable={updatePurchaseableHandler(props.ings)}
          purchasing={purchaseHandler}
          isAuthed={props.isAuthed}
        />
      </Aux>
    );
    orderSummary = (
      <Summary
        ingredients={props.ings}
        cancel={purchaseHandler}
        checkout={checkOutHandler}
        totalPrice={props.prc}
      />
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} clicked={purchaseHandler}>
        {orderSummary}
      </Modal>
      {burgerArea}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    prc: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
    isAuthed: state.auth.token !== null,
  };
};

const mapdDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirPath: (targetUrl) => dispatch(actions.authRedir(targetUrl)),
  };
};

export default connect(
  mapStateToProps,
  mapdDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
