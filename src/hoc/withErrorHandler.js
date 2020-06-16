import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import Aux from "./Aux";

const withErrorHandler = (WrappendComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req
      });
      axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: error });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal clicked={this.errorConfirmedHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappendComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
