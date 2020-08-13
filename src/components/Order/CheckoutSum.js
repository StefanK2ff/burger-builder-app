import React from 'react';
import BurgerPreview from '../Burger/BurgerPreview';
import Button from "../UI/Button/Button";

import classes from "./CheckoutSum.module.css";

export default function CheckoutSum(props) {
    return (
        <div className={classes.CheckoutSum}>
            <h1>We hope you like your burger!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <BurgerPreview ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                click={props.checkoutCancelled}
                >cancel</Button>
            <Button 
                btnType="Success"
                click={props.checkoutContinued}>continue</Button>
        </div>
    )
}
