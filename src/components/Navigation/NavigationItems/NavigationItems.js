import React from 'react'
import classes from "./NavigationItems.module.css"
import NavigationItem from './NavigationItem/NavigationItem'

export default function navigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem target="/" exact>Burger Builder</NavigationItem>
            <NavigationItem target="/orders">My Orders</NavigationItem>
            <NavigationItem target="/auth">Login/Register</NavigationItem>
        </ul>
    )
}
