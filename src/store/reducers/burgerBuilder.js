import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "./../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.5,
  bacon: 2,
  meat: 3,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedState = {
    ingredients: updateObj(state.ingredients, updatedIngredient),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObj(state, updatedState);
};

const removeIngredient = (state, action) => {
  const removedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const reducedState = {
    ingredients: updateObj(state.ingredients, removedIngredient),
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObj(state, reducedState);
};

const setIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredients = (state, action) => {
  return updateObj(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGS_FAILED:
      return fetchIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
