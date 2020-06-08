import React from 'react'
import classes from "./Modal.module.css"

export default function modal(props) {
    return (
        <div className={classes.Modal}>
            {props.children}
        </div>
    )
}
