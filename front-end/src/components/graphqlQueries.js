import { gql } from "@apollo/client";

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
      lastName
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

export const FETCH_JOB_POSTS = gql`
  query jobPosts($userId: String!) {
    jobPosts(userId: $userId) {
      _id
      title
      description
      location
      experienceLevel
      employmentType
      salaryRange
      creationDate
      closingDate
    }
  }
`;

export const CREATE_JOB_POST = gql`
  mutation createJobPost($userId: String!, $jobPostInput: JobPostInput!) {
    createJobPost(userId: $userId, jobPostInput: $jobPostInput) {
      title
      description
      location
      experienceLevel
      employmentType
      salaryRange
      creationDate
      closingDate
    }
  }
`;

export const FETCH_JOB_POST = gql`
  query jobPost($jobPostId: ID!) {
    jobPost(jobPostId: $jobPostId) {
      _id
      title
      description
      location
      experienceLevel
      employmentType
      salaryRange
      creationDate
      closingDate
    }
  }
`;

export const UPDATE_JOB_POST = gql`
  mutation updateJobPost($jobId: ID!, $jobPostInput: JobPostInput!) {
    updateJobPost(jobPostId: $jobId, jobPostInput: $jobPostInput) {
      title
      description
      location
      experienceLevel
      employmentType
      salaryRange
      creationDate
      closingDate
    }
  }
`;
