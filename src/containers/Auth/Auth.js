import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";

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
  };

  checkValiditiy = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.contains) {
      isValid = value.indexOf(rules.contains) !== -1 && isValid;
    }
    if (rules.isEmail) {
        isValid = value.indexOf("@") !== -1 && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (e, ident) => {
    const updatedControls = {
        ...this.state.controls,
        [ident]: {
            ...this.state.controls[ident],
            value: e.target.value,
            valid: this.checkValiditiy(e.target.value, this.state.controls[ident].validation),
            touched: true
        }
    };
    this.setState({controls: updatedControls});

  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
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
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pw) => dispatch(actions.auth(email, pw))
    }
}

export default connect(null, mapDispatchToProps)(Auth);