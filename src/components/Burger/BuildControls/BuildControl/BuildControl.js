import React from 'react'
import classes from "./BuildControl.module.css"

export default function BuildControl(props) {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.label}>{props.label}</div>
            <button className={classes.Less} 
                onClick={props.removeIngredients} 
                disabled={props.disabled}>Less</button>
            <button className={classes.More}
                onClick={props.addIngredients}>More</button>
        </div>
    )
}
