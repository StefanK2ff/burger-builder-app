import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerVisible: false,
  };

  sideDrawerHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerVisible: !prevState.sideDrawerVisible };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toggleVisibilitySD={this.sideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          currentlyVisible={this.state.sideDrawerVisible}
          toggleVisibility={this.sideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);