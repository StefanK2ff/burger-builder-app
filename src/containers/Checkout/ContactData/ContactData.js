import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { checkValidity } from "../../../shared/validate";

import { connect } from "react-redux";
import * as orderActions from "../../../store/actions";

const ContactData = (props) => {

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        //just use normal html elements here
        type: "text",
        placeholder: "Your Name here",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street here",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your ZIP code here",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your City here",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail here",
      },
      value: "",
      validation: {
        required: true,
        contains: "@",
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      value: "fastest",
      valid: true,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElementIdent in orderForm) {
      formData[formElementIdent] = orderForm[formElementIdent].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.prc, //normally: recalculate price on server
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (e, inputIdent) => {
    const updatedForm = {
      ...orderForm, //copies the pointer
    };
    const updatedFormElement = {
      ...updatedForm[inputIdent],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdent] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdents in updatedForm) {
      formIsValid = updatedForm[inputIdents].valid && formIsValid;
    }
    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement) => (
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
        ))}

        <Button btnType="Success" disabled={!formIsValid}>
          Order now
        </Button>
      </form>
    );

    if (props.ldng) {
      form = <Spinner />;
    }

    return <div className={classes.ContactData}>{form}</div>;
  }


const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    prc: state.burgerBuilder.totalPrice,
    ldng: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
