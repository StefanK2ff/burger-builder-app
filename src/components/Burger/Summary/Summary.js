import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from "./../../UI/Button/Button"

export default function summary(props) {
    const ingSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                        <span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}
                    </li>
        })
    return (
        <Aux>
            <h3>Your Order is {props.totalPrice.toFixed(2)}$.</h3>
            <p>The following ingredients were selected</p>
            <ul>
                {ingSummary}
            </ul>
            <Button btnType="Secondary" click={props.cancel}>Cancel</Button>
            <Button btnType="Primary" click={props.checkout}>Continue to Ceckout</Button>

        </Aux>
    )
}
