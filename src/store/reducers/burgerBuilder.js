import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "./../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.5,
    bacon: 2,
    meat: 3,
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedState = {
                ingredients: updateObj(state.ingredients, updatedIngredient),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObj(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const removedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const reducedState = {
                ingredients: updateObj(state.ingredients, removedIngredient),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObj(state, reducedState);
        case actionTypes.SET_INGREDIENTS: 
            return updateObj (state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
            });
        case actionTypes.FETCH_INGS_FAILED:
            return updateObj(state, {error: true})
        default:
            return state;
    }
}

export default reducer;