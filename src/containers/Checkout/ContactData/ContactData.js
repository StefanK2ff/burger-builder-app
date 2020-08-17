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
            elementConfig: { //just use normal html elements here
                type: "text",
                placeholder: "Your Name here"
            },
            value: "",
        },
        stree: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Street here"
            },
            value: "",
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your ZIP code here"
            },
            value: "",
        },
        city: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your City here"
            },
            value: "",
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your E-Mail here"
            },
            value: "",
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: { 
                options: [
                    {value: "fastest", displayValue: "Fastest"},
                    {value: "cheapest", displayValue: "Cheapest"}
                ]
            },
            value: "",
        },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice, //normally: recalculate price on server
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

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id:key,
            config: this.state.orderForm[key]
        })
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            />
        ))}
        
        <Button btnType="Success" click={this.orderHandler}>
          Order now
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}
