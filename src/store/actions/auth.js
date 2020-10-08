import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    const API_KEY = "AIzaSyB3O7oV3Rg6a8cpmc0AElVZITZ8-fnmk8g";

    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let signupURL = "accounts:signUp?key=";
    if (!isSignup) {
      signupURL = "accounts:signInWithPassword?key=";
    }

    axios
      .post(signupURL + API_KEY, authData)
      .then((resp) => {
        console.log(resp);
        dispatch(authSuccess(resp.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
