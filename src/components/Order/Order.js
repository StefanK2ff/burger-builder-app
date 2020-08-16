import React from "react";
import classes from "./Order.module.css";

export default function Order(props) {
  const ingredientsArr = [];

  for (let ingredient in props.ingredients) {
    ingredientsArr.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }

  const ingredientsOutput = ingredientsArr.map(ig => {
      return <span key={ig.name}>{ig.name}({ig.amount}) </span>
  })

  return (
    <div className={classes.Order}>
        <p>BurgerOrder: {props.id}</p>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}
