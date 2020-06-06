import React from 'react'
import classes from "./BurgerPreview.module.css"
import Ingredient from './Ingredient/Ingredient'


export default function burgerPreview(props) {
    const ingredientsArr = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <Ingredient key={igKey + i} type={igKey} />;
            });
        });

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {ingredientsArr}
            <Ingredient type="bread-bottom"/>
        </div>
    )
}
