import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

export default function buildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong> {props.totalPrice.toFixed(2)}$</strong>{" "}
      </p>
      <div>
        {controls.map((control) => {
          return (
            <BuildControl
              key={control.label}
              label={control.label}
              addIngredients={() => props.addIngredients(control.type)}
              removeIngredients={() => props.removeIngredients(control.type)}
              disabled={props.disabled[control.type]}
            />
          );
        })}
      </div>
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.purchasing}
      >
        {props.isAuthed ? "Order now" : "Sign in to continue"}
      </button>
    </div>
  );
}
