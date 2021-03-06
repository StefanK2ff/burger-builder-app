import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

export default class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // componentDidUpdate() {
  //   console.log("[Modal] componentDidUpdate")
  // }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />

        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
