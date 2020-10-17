import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

export const authFail = (error) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedir = (targetUrl) => {
  return {
    type: actionTypes.AUTH_REDIR,
    targetUrl
  }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            console.log("Session expired")
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

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
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("userId", resp.data.localId);
        localStorage.setItem("expirationDate", new Date (new Date().getTime() + resp.data.expiresIn *1000));
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn))
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date ()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, localStorage.getItem("userId")));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
      }
      
    }
  }
}