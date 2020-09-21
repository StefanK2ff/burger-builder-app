import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axios
      .post("orders.json", orderData)
      .then((resp) => {
        dispatch(purchseBurgerSuccess(resp.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
