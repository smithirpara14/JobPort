import React from 'react';
import { Spinner } from 'react-bootstrap';

const QueryResult = ({ loading, error, data, children }) => {
    if (error) {
      return <p>ERROR: {error.message}</p>;
    }
    if (loading) {
      return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (!data) {
      return <p>Nothing to show...</p>;
    }
    if (data) {
      return children;
    }
};
  
export default QueryResult;