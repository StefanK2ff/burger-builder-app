import React from 'react'
import classes from './Input.module.css';

export default function Input(props) {
    let inputElem = null;

    switch (props.inputType) {
        case ("input"):
            inputElem = <input className={classes.InputElem} {...props}/>;
            break;
        case ("textarea"):
            inputElem = <textarea  className={classes.InputElem} {...props}/>;
            break;
        //number, email ...
        default:
            inputElem = <input  className={classes.InputElem} {...props}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>
    )
}
