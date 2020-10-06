import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true,
        }
        axios.post("accounts:signUp?key=AIzaSyB3O7oV3Rg6a8cpmc0AElVZITZ8-fnmk8g", authData)
        .then(resp => {
            console.log(resp);
            dispatch(authSuccess(resp.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    }
}