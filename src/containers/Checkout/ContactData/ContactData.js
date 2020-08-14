import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button"

export default class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipcode: "",
        }
    }
    render() {
        
        return (
            <div>
                <h4>Your data</h4>
                <form>
                    <input type="text" name="name" palceholder="Your name"></input>
                    <input type="email" name="email" placeholder="Your email"></input>
                    <input type="text" name="street" placeholder="Street & housenumber"></input>
                    <input type="text" name="zipcode" placeholder="12345"></input>
                    <Button btnType="success">Order now</Button>
                </form>
            </div>
        )
    }
}
