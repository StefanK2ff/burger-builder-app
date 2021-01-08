import React from 'react';
import useHttpErrorHandler from "../hooks/http-error-handler";

import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  
  const WithErrorHandler = props => {
    const [error, setError] = useHttpErrorHandler(axios);
    
    return <>
      <Modal 
        show={error !== null}
        clicked={() => setError(null)}
      >
        {error !== null && error}
      </Modal>
      <WrappedComponent {...props}/>
    </>
  };

  return WithErrorHandler;
};

export default withErrorHandler;

