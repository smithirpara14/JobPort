import React, { Component } from "react";
import { gql } from "@apollo/client";

const GET_ACCOUNT_TYPE = gql`
  query AccountType($accountTypeId: ID!) {
    accountType(accountTypeId: $accountTypeId) {
      _id
      name
      description
    }
  }
`;

const UPDATE_ACCOUNT_TYPE = gql`
  mutation UpdateAccountType($accountTypeId: ID!, $name: String!, $description: String!) {
    updateAccountType(accountTypeId: $accountTypeId, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

class UpdateAccountType extends Component {
  
  render() {
    return (
      <div>
        <h1>Update Account Type</h1>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              id="description"
              name="description"
              required
            />
          </div>
          <button type="submit">Update Account Type</button>
        </form>
      </div>
    );
  }
}

export default UpdateAccountType;
