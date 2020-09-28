import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler"
//import orderInstance from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
            <Order 
                id={order.id}
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios)