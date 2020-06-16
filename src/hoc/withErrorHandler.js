import React from "react";
import Modal from "../components/UI/Button";
import Aux from "./Aux";

const withErrorHandler = (WrappendComponent) => {
  return (props) => {
    return (
      <Aux>
        <Modal>Something didn't work!</Modal>
        <WrappendComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
