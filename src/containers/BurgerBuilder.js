import React, { Component } from 'react'
import Aux from '../hoc/Aux'
import BurgerPreview from '../components/Burger/BurgerPreview'

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <BurgerPreview />
                <div>Build Controls</div>
            </Aux>
            
        )
    }
}
