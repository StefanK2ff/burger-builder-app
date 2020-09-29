import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "./../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObj(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObj(action.orderData, { id: action.orderId });
  return updateObj(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObj(state, { loading: false });
};

const ordersFetchStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const ordersFetchSuccess = (state, action) => {
  return updateObj(state, { orders: action.orders, loading: false });
};

const ordersFetchFail = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.ORDERS_FETCH_START:
      return ordersFetchStart(state, action);

    case actionTypes.ORDERS_FETCH_SUCCESS:
      return ordersFetchSuccess(state, action);

    case actionTypes.ORDERS_FETCH_FAIL:
      return ordersFetchFail(state, action);

    default:
      return state;
  }
};

export default reducer;
