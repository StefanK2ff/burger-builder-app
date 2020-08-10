import React, { Component } from 'react'
import CheckoutSum from '../../components/Order/CheckoutSum'

export default class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1
        }
    }
    render() {
        return (
            <div>
                <CheckoutSum ingredients={this.state.ingredients} />
            </div>
        )
    }
}
