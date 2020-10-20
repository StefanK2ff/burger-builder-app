import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

export default function sideDrawer(props) {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.currentlyVisible) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <Aux>
      <Backdrop show={props.currentlyVisible} clicked={props.toggleVisibility}/>
      <div className={attachedClasses.join(" ")} onClick={props.toggleVisibility}>
        {/* <div onClick={props.toggleVisibility}>
            Close Menu
        </div> */}
        <Logo height="2em" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </Aux>
  );
}
