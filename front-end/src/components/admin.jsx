import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ACCOUNT_TYPES = gql`
  query {
    accountTypes {
      _id
      name
      description
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

class AccountTypesAndUsers extends Component {
  render() {
    return (
      <div>
        <AccountTypes />
        <Users />
      </div>
    );
  }
}

function AccountTypes() {
  const { loading, error, data } = useQuery(GET_ACCOUNT_TYPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Account Types</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.accountTypes.map(accountType => (
            <tr key={accountType._id}>
              <td>{accountType._id}</td>
              <td>{accountType.name}</td>
              <td>{accountType.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birth Date</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.birthDate}</td>
              <td>{user.accountType ? user.accountType.name : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTypesAndUsers;
