import { useState, useEffect } from "react";

export default httpClient => {
    const [error, setError] = useState(null);
    
    const requestInterceptor = httpClient.interceptors.request.use(
      req => {
        setError(null);
        return req;
      },
      errorParameter => {
        console.log(
          'Error handler > request > error',
          errorParameter
        );
        setError(errorParameter);
        return Promise.reject(errorParameter);
      }
    );
    
    const responseInterceptor = httpClient.interceptors.response.use(
      res => res,
      errorParameter => {
        console.log(
          'Error handler > response > error',
          errorParameter
        );
        setError(errorParameter);
        return Promise.reject('Request failed. Status code 404');
      }
    );
    
    useEffect(() => {
        return () => {
          httpClient.interceptors.request.eject(requestInterceptor);
          httpClient.interceptors.response.eject(responseInterceptor);
        };
      },
      [requestInterceptor, responseInterceptor]
    );

    return [error, setError]
}