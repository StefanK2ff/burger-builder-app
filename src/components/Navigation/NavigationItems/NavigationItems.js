import React from 'react'
import classes from "./NavigationItems.module.css"
import NavigationItem from './NavigationItem/NavigationItem'

export default function navigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem target={"/"} active>Burger Builder</NavigationItem>
            <NavigationItem target={"/"}>My Account</NavigationItem>
        </ul>
    )
}
