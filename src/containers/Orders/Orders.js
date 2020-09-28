import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    return (
      <div>
        {this.props.orders.map(order => (
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

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.ordersFetch())
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));