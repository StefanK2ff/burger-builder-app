import React from 'react'
import classes from "./BurgerPreview.module.css"
import Ingredient from './Ingredient/Ingredient'


export default function burgerPreview(props) {
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            <Ingredient type="cheese"/>
            <Ingredient type="meat"/>
            <Ingredient type="bread-bottom"/>
        </div>
    )
}
