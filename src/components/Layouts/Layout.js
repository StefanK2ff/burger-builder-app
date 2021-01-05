import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [drawerIsVisible, setDrawerIsVisible] = useState(false);

  const sideDrawerHandler = () => {
    setDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setDrawerIsVisible(!drawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        toggleVisibilitySD={sideDrawerToggleHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        currentlyVisible={drawerIsVisible}
        toggleVisibility={sideDrawerHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
