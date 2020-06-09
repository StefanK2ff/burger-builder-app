import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export default class Layout extends Component {
  state = {
    sideDrawerVisible: false
  }
  
  sideDrawerHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerVisible: !prevState.sideDrawerVisible} 
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar toggleVisibilitySD={this.sideDrawerHandler}/>
        <SideDrawer currentlyVisible={this.state.sideDrawerVisible} toggleVisibility={this.sideDrawerHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
