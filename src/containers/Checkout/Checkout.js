import React, { Component } from 'react'
import CheckoutSum from '../../components/Order/CheckoutSum'

export default class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
 
    checkoutContinueddHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients})
    }


    render() {
        return (
            <div>
                <CheckoutSum 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinueddHandler}
                     />
            </div>
        )
    }
}
