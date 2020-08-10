import React from 'react';
import BurgerPreview from '../Burger/BurgerPreview';
import Button from "../UI/Button/Button";

import classes from "./CheckoutSum.module.css";

export default function CheckoutSum(props) {
    return (
        <div className={classes.CheckoutSum}>
            <h1>We hope you like your burger!</h1>
            <div style={{width: '300px', height: '300px', margin: 'auto'}}>
                <BurgerPreview ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked
                >cancel</Button>
            <Button 
                btnType="Success"
                clicked>continue</Button>
        </div>
    )
}
