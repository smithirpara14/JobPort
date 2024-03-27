import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ACCOUNT_TYPES, DELETE_ACCOUNT_TYPE } from '../graphqlQueries';
import AdminNav from './adminNav';
import { Container } from 'react-bootstrap';

const CheckAccountTypes = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNT_TYPES);

  const [deleteAccountType] = useMutation(DELETE_ACCOUNT_TYPE, {
    refetchQueries: [{ query: GET_ACCOUNT_TYPES }]
  });

  const handleDeleteAccountType = (accountTypeId) => {
    if (window.confirm("Are you sure you want to delete this account type?")) {
      deleteAccountType({ variables: { accountTypeId } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AdminNav />
      <Container>
        <h2>Account Types</h2>
        <Link to="/createAccountType" className="btn btn-primary mb-3">Create Account Type</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.accountTypes.map(accountType => (
              <tr key={accountType._id}>
                <td>{accountType._id}</td>
                <td>{accountType.name}</td>
                <td>{accountType.description}</td>
                <td>
                  <Link to={`/updateAccountType/${accountType._id}`} className="btn btn-sm btn-info mr-1">
                    Update
                  </Link>
                  <button onClick={() => handleDeleteAccountType(accountType._id)} className="btn btn-sm btn-danger ml-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default CheckAccountTypes;
