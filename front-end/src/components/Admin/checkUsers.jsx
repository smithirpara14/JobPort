import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, DELETE_USER } from '../graphqlQueries';
import AdminNav from './adminNav';
import { Container } from 'react-bootstrap';

const CheckUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser({ variables: { userId } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AdminNav />
      <Container>
        <h2>Users</h2>
        <Link to="/createUser" className="btn btn-primary mb-3">Create User</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th className='d-none'>Birth Date</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className='d-none'>{user.birthDate}</td>
                <td>{user.accountType ? user.accountType.name : "N/A"}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className="btn btn-sm btn-danger">
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

export default CheckUsers;
