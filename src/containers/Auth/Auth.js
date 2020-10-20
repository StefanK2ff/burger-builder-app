import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../shared/validate";

import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true,
  };

  switchAuthModeHandler = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  inputChangedHandler = (e, ident) => {
    const updatedControls = {
      ...this.state.controls,
      [ident]: {
        ...this.state.controls[ident],
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[ident].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirPath !== "/") {
      this.props.onSetAuthRedirPath();
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
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
        onChange={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    const headline = this.state.isSignUp ? "Please sign up" : "Please sign in";

    const caption = this.state.isSignUp
      ? "Switch to sign in"
      : "Switch to sign up";

    let errorMsg = null;

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      errorMsg = (
        <p>
          <br />
          {this.props.error.message}
        </p>
      );
    }

    let authRedir = null;
    if (this.props.isAuthenticated) {
      authRedir = <Redirect to={this.props.authRedirPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedir}
        {headline}
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" click={this.switchAuthModeHandler}>
          {caption}
        </Button>
      </div>
    );
  }
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
