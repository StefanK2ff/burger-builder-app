import React from 'react'
import Aux from '../../../hoc/Aux'

export default function summary(props) {
    const ingSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                        <span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}
                    </li>
        })
    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>The following ingredients were selected</p>
            <ul>
                {ingSummary}
            </ul>
            <p>Continue to Ceckout</p>

        </Aux>
    )
}
