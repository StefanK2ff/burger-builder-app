import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipcode: "",
    },
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice, //normally: recalculate price on server
      customer: {
        name: "Bob Ross",
        address: {
          stree: "Streetington 2",
          zipCode: "1234",
          city: "Barcelona",
        },
        email: "bob@bob.bob",
      },
      deliveryMethod: "express",
    };
    axios
      .post("orders.json", order)
      .then((resp) => {
        console.log(resp);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Your data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name"
          ></input>
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your email"
          ></input>
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street & housenumber"
          ></input>
          <input
            className={classes.Input}
            type="text"
            name="zipcode"
            placeholder="12345"
          ></input>
          <Button btnType="Success" click={this.orderHandler}>
            Order now
          </Button>
        </form>
      </div>
    );
  }
}
