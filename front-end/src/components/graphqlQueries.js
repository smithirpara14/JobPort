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

export const DELETE_JOB_POST = gql`
  mutation deleteJobPost($jobPostId: ID!) {
    deleteJobPost(jobPostId: $jobPostId) {
      _id
    }
  }
`;

export const FETCH_ALL_JOB_POSTS = gql`
  query allJobPosts {
    allJobPosts {
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

// mutation for saving a job
export const SAVE_JOB = gql`
  mutation SaveJob($email: String!, $jobPostId: ID!) {
    saveJob(email: $email, jobPostId: $jobPostId) {
      _id
      savedDate
      user {
        _id
      }
      job {
        _id
      }
    }
  }
`;

// query to fetch saved jobs by email
export const FETCH_SAVED_POSTS_BY_EMAIL = gql`
  query savedPosts($email: String!) {
    savedJobsByEmail(email: $email) {
      _id
      user {
        _id
      }
      job {
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
      savedDate
    }
  }
`;

// mutation to remove a saved job
export const REMOVE_SAVED_JOB = gql`
  mutation RemoveSavedJob($savedJobId: ID!) {
    removeSavedJob(savedJobId: $savedJobId) {
      _id
    }
  }
`;