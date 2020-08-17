import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipcode: "",
    },
    loading: false,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street & housenumber"
        />
        <Input
          inputtype="input"
          type="text"
          name="zipcode"
          placeholder="12345"
        />
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
