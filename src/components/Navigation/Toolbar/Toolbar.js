import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";

function toolbar() {
  return (
    <header className={classes.Toolbar}>
      <Logo height="80%" />

      <nav className={classes.DesktopOnly}>
        {" "}
        <NavigationItems />{" "}
      </nav>
    </header>
  );
}

export default toolbar;
