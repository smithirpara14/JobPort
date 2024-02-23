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
            <Link to="/createAccountType">Create Account Type</Link>
            <table>
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
                                <UpdateButton accountType={accountType} />
                                <DeleteButton accountTypeId={accountType._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UpdateButton({ accountType }) {
    return (
        <Link to={`/updateAccountType/${accountType._id}`}>
            Update
        </Link>
    );
}

function DeleteButton({ accountTypeId }) {
    const [deleteAccountType] = useMutation(DELETE_ACCOUNT_TYPE, {
        variables: { accountTypeId },
        refetchQueries: [{ query: GET_ACCOUNT_TYPES }]
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this account type?")) {
            deleteAccountType();
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
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
                            <td>
                                <DeleteUserButton userId={user._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function DeleteUserButton({ userId }) {
    const [deleteUser] = useMutation(DELETE_USER, {
      variables: { userId },
      refetchQueries: [{ query: GET_USERS }]
    });
  
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        deleteUser();
      }
    };
  
    return <button onClick={handleDelete}>Delete</button>;
  }

export default AccountTypesAndUsers;
