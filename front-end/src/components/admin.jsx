import React, { Component } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_ACCOUNT_TYPES = gql`
  query {
    accountTypes {
      _id
      name
      description
    }
  }
`;

const DELETE_ACCOUNT_TYPE = gql`
  mutation DeleteAccountType($accountTypeId: ID!) {
    deleteAccountType(accountTypeId: $accountTypeId) {
      _id
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      _id
      firstName
      lastName
      email
      birthDate
      accountType {
        name
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;

class AccountTypesAndUsers extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <AccountTypes />
          </div>
          <div className="col">
            <Users />
          </div>
        </div>
      </div>
    );
  }
}

function AccountTypes() {
  const { loading, error, data } = useQuery(GET_ACCOUNT_TYPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Account Types</h2>
      <Link to="/createAccountType" className="btn btn-primary mb-3">
        Create Account Type
      </Link>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.accountTypes.map((accountType) => (
              <tr key={accountType._id}>
                <td>{accountType._id}</td>
                <td>{accountType.name}</td>
                <td>{accountType.description}</td>
                <td>
                  <UpdateButton accountType={accountType} />
                  <DeleteButton accountTypeId={accountType._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpdateButton({ accountType }) {
  return (
    <Link
      to={`/updateAccountType/${accountType._id}`}
      className="btn btn-sm btn-primary mr-2 m-1"
    >
      Update
    </Link>
  );
}

function DeleteButton({ accountTypeId }) {
  const [deleteAccountType] = useMutation(DELETE_ACCOUNT_TYPE, {
    variables: { accountTypeId },
    refetchQueries: [{ query: GET_ACCOUNT_TYPES }],
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this account type?")) {
      deleteAccountType();
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-sm btn-danger ml-2">
      Delete
    </button>
  );
}

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      <div className="d-flex justify-content-right mb-3">
        <Link to="/createUser" className="btn btn-primary">
          Create User
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Account Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.birthDate}</td>
                <td>{user.accountType ? user.accountType.name : "N/A"}</td>
                <td>
                  <DeleteUserButton userId={user._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeleteUserButton({ userId }) {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { userId },
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser();
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-sm btn-danger">
      Delete
    </button>
  );
}

export default AccountTypesAndUsers;
