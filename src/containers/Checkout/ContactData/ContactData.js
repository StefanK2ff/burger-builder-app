import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
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
      stree: {
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
          minLength: 5
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
          contains: "@"
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
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdent in this.state.orderForm) {
      formData[formElementIdent] = this.state.orderForm[formElementIdent].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice, //normally: recalculate price on server
      orderData: formData,
    };
    axios
      .post("orders.json", order)
      .then((resp) => {
        console.log(resp);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  checkValiditiy = (value, rules) => {
    let isValid = true
    if (rules.required) {
        isValid = value.trim() !== "" && isValid
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.contains) {
        isValid = value.indexOf(rules.contains) !== -1 && isValid
    }
    return isValid
  };

  inputChangedHandler = (e, inputIdent) => {
    const updatedForm = {
      ...this.state.orderForm, //copies the pointer
    };
    const updatedFormElement = {
      ...updatedForm[inputIdent],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValiditiy(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdent] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdents in updatedForm) {
        formIsValid = updatedForm[inputIdents].valid && formIsValid
    }
    this.setState({ orderForm: updatedForm, formIsValid: formIsValid});
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            validate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) =>
              this.inputChangedHandler(event, formElement.id)
            }
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>Order now</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}
