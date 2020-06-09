import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";

function toolbar(props) {
  const menueClasses = [classes.MobileOnly, classes.Menue]
  return (
    <header className={classes.Toolbar}>
      <div onClick={props.toggleVisibilitySD} className={menueClasses.join (" ")}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.DesktopOnly}>
        <Logo height="2em" />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default toolbar;
