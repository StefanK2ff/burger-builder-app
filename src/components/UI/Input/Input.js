import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElem}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElem}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    //number, email ...
    case "select":
      inputElement = (
        <select
          className={classes.InputElem}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );

      break;
    default:
      inputElement = (
        <input
          className={classes.InputElem}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}
