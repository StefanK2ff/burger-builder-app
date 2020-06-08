import React from 'react'
import classes from "./NavigationItem.module.css"

export default function navigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <a href={props.target}
                className={props.active ? classes.active : null}
                >
                {props.children}
                </a>
        </li>
    )
}
