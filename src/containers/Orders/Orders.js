import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler"

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then((res) => {
        console.log(res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            })
        }
        this.setState({orders:fetchedOrders, loading: false });
      })
      .catch((res) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
            <Order 
                key={order.id}
                
                />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios)