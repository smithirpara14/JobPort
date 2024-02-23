import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_ACCOUNT_TYPE = gql`
  mutation CreateAccountType($name: String!, $description: String!) {
    createAccountType(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

const CreateAccountType = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createAccountType] = useMutation(CREATE_ACCOUNT_TYPE);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createAccountType({ variables: { name, description } });
      navigate("/admin"); 
      // TODO: refresh admin page when redirected cause list is not updated.
    } catch (error) {
      console.error("Error creating account type:", error);
    }
  };

  return (
    <div>
      <h1>Create Account Type</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account Type</button>
      </form>
    </div>
  );
};

export default CreateAccountType;
