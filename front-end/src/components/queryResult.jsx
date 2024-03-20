import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../App.css';
const QueryResult = ({ loading, error, data, children }) => {
    if (error) {
      return <p>ERROR: {error.message}</p>;
    }
    if (loading) {
      return (
        <div className="loading-spinner">
          <Spinner animation="grow" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span className="loading-text">Fetching data...</span>
        </div>
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