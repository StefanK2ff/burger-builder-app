import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../shared/validate";

import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = (props) => {

  const [controls, setControls] = useState(
    {
      email: {
        elementType: "input",
        elementConfig: {
          //just use normal html elements here
          type: "email",
          placeholder: "Email Adress",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          //just use normal html elements here
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    }
  )

  const [isSignUp, setIsSignUp] = useState(true);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (e, ident) => {
    const updatedControls = {
      ...controls,
      [ident]: {
        ...controls[ident],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          controls[ident].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  };
  
  const { onSetAuthRedirPath, buildingBurger, authRedirPath} = props;

  useEffect( () => {
    if (!buildingBurger && authRedirPath !== "/") {
      onSetAuthRedirPath();
    }
  },[onSetAuthRedirPath, buildingBurger, authRedirPath]);

    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        validate={formElement.config.validation}
        touched={formElement.config.touched}
        onChange={(event) => inputChangedHandler(event, formElement.id)}
      />
    ));

    const headline = isSignUp 
      ? "Please sign up" 
      : "Please sign in";

    const caption = isSignUp
      ? "Switch to sign in"
      : "Switch to sign up";

    let errorMsg = null;

    if (props.loading) {
      form = <Spinner />;
    }

    if (props.error) {
      errorMsg = (
        <p>
          <br />
          {props.error.message}
        </p>
      );
    }

    let authRedir = null;
    if (props.isAuthenticated) {
      authRedir = <Redirect to={props.authRedirPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedir}
        {headline}
        {errorMsg}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" click={switchAuthModeHandler}>
          {caption}
        </Button>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirPath: state.auth.authRedirPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pw, isSignup) =>
      dispatch(actions.auth(email, pw, isSignup)),
    onSetAuthRedirPath: () => dispatch(actions.authRedir("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
