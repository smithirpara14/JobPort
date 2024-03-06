import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_ACCOUNT_TYPES = gql`
  query {
    accountTypes {
      _id
      name
      description
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(userInput: $input) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const CreateUser = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountTypeId, setAccountTypeId] = useState("");
  
  const { loading, error, data } = useQuery(GET_ACCOUNT_TYPES);
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            accountType: accountTypeId,
          },
        },
      });
      navigate("/admin"); // Redirect to admin page after successful creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            value={accountTypeId}
            onChange={(e) => setAccountTypeId(e.target.value)}
            required
          >
            <option value="">Select Account Type</option>
            {data.accountTypes.map((accountType) => (
              <option key={accountType._id} value={accountType._id}>
                {accountType.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
