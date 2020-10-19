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

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("orders.json?auth=" + token, orderData)
      .then((resp) => {
        dispatch(purchseBurgerSuccess(resp.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const orderFetchSuccess = (orders) => {
  return {
    type: actionTypes.ORDERS_FETCH_SUCCESS,
    orders,
  };
};
export const ordersFetchFail = (error) => {
  return {
    type: actionTypes.ORDERS_FETCH_FAIL,
    error,
  };
};
export const ordersFetchStart = () => {
  return {
    type: actionTypes.ORDERS_FETCH_START,
  };
};

export const ordersFetch = (token, userId) => {
  return (dispatch) => {
    dispatch(ordersFetchStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('orders.json' + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(orderFetchSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(ordersFetchFail(err));
      });
  };
};
