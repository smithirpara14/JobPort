import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      firstName
      lastName
      email
      birthDate
    }
  }
`;

export const FETCH_USER_PERSONAL_INFO = gql`
  query user($email: String!) {
    user(email: $email) {
      birthDate
      email
      firstName
      lastName,
      accountType {
        name
      }
    }
  }
`;

export const UPDATE_USER_PERSONAL_INFO = gql`
  mutation updateUserPersonalInfo($userPersonalInfo: UserPersonalInfo!) {
    updateUserPersonalInfo(userPersonalInfo: $userPersonalInfo) {
      firstName
      lastName
      birthDate
    }
  }
`;

