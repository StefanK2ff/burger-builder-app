import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    //the action that we want to dispatch (sync)
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngsFailed = () => {
    return {
        rype: actionTypes.FETCH_INGS_FAILED
    };
}

export const initIngredients = () => {
  return (dispatch) => {
    //place for async code
    axios
      .get("ingredients.json")
      .then((resp) => {
        dispatch(setIngredients(resp.data));
      })
      .catch((err) => {
        dispatch(fetchIngsFailed());
      });
  };
};
