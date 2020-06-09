import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css"

export default function sideDrawer(props) {
  //

  return (
    <div className={classes.SideDrawer}>
      <Logo height="2em"/>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}
