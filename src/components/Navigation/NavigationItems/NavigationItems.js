import React from 'react'
import classes from "./NavigationItems.module.css"
import NavigationItem from './NavigationItem/NavigationItem'

export default function navigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem target="/" exact>Burger Builder</NavigationItem>
            <NavigationItem target="/orders">My Orders</NavigationItem>
            {!props.isAuthenticated 
                ? <NavigationItem target="/auth">Login/Register</NavigationItem>
                : <NavigationItem target="/logout">Logout</NavigationItem>}
        </ul>
    )
}
