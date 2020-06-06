import React from 'react'
import classes from "./BurgerPreview.module.css"
import Ingredient from './Ingredient/Ingredient'


export default function burgerPreview(props) {
    let ingredientsArr = Object.keys(props.ingredients)
        //creates an array in the length of the amount of ingredient elements
        //creates for each element an sub arrays in the length of the amount of the concrete  ingredients
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <Ingredient key={igKey + i} type={igKey} />;
            });
        })
        //flattens the array of arrays
        .reduce((arr, el)=> {
            return arr.concat(el)
        },[])
    if (ingredientsArr.length === 0) {ingredientsArr = <p>Please add your burger ingredients</p>}
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {ingredientsArr}
            <Ingredient type="bread-bottom"/>
        </div>
    )
}
