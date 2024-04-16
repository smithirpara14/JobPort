import { gql } from "@apollo/client";


export const GET_ACCOUNT_TYPES = gql`
  query accountTyes{
    accountTypes {
      _id
      name
      description
    }
  }
`;

export const DELETE_ACCOUNT_TYPE = gql`
  mutation DeleteAccountType($accountTypeId: ID!) {
    deleteAccountType(accountTypeId: $accountTypeId) {
      _id
    }
  }
`;

export const GET_USERS = gql`
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

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;

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
      subscriptionType
      stripeId
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

export const FETCH_JOB_POST_APPLICATIONS = gql`
  query jobPostWithApplications($jobPostId: ID!) {
    jobPostWithApplications(jobPostId: $jobPostId) {
      jobPost {
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
      applications {
        _id
        user {
          _id
          firstName
          lastName
          email
        }
        applicationDate
        status
        resume {
          filename,
          _id,
        }
      }
    }
  }
`;

export const FETCH_JOB_POST_APPLICATION = gql`
  query jobPostWithApplication($jobPostId: ID!, $userId: String!) {
    jobPostWithApplication(jobPostId: $jobPostId, userId: $userId) {
      jobPost {
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
      application {
        _id,
        status
      }
      savedJob {
        _id
      }
  }
}`;

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

//query to fetch saved, applied jobs by user
export const FETCH_SAVED_APPLIED_JOBS = gql`
  query savedAppliedJobsByUser($userId: String!) {
    savedAppliedJobsByUser(userId: $userId) {
      savedJobs {
        _id
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
      appliedJobs {
        _id
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
        applicationDate
        status
      }
  }
}`;

// mutation to remove a saved job
export const REMOVE_SAVED_JOB = gql`
  mutation RemoveSavedJob($savedJobId: ID!) {
    removeSavedJob(savedJobId: $savedJobId) {
      _id
    }
  }
`;

// query recruiter summary
export const FETCH_RECRUITER_SUMMARY = gql`
  query recruiterSummary($userId: String!) {
    recruiterSummary(userId: $userId) {
      totalJobPosts
      totalApplications
      activeJobPosts
      closedJobPosts
      todayJobPosts
      todayApplications
    }
  }
`;

// mutaion to apply for a job createApplication(userId: String!, jobPostId: String!): Application
export const APPLY_JOB = gql`
  mutation createApplication($userId: String!, $jobPostId: String!) {
    createApplication(userId: $userId, jobPostId: $jobPostId) {
      _id
      applicationDate
      status
    }
  }
`;

// mutation to update application status
export const UPDATE_APPLICATION_STATUS = gql`
  mutation updateApplicationStatus($applicationId: ID!, $status: String!) {
    updateApplicationStatus(applicationId: $applicationId, status: $status) {
      _id
      status
    }
  }
`;


// query to fetch resume by user
export const FETCH_RESUME = gql`
  query getResume($userId: String!) {
    getResume(userId: $userId) {
      _id
      filename
    }
  }
`;

// query to fetch resume file
export const FETCH_RESUME_FILE = gql`
  query getResumeFile($userId: String!) {
    getResumeFile(userId: $userId) {
      filename
      mimetype
      data
    }
  }
`;

// mutation to upload resume
export const UPLOAD_RESUME = gql`
  mutation uploadResume($userId: String!, $file: Upload!) {
    uploadResume(userId: $userId, file: $file) {
      filename
      mimetype
      fileId
    } 
  }
`;

// mutation to delete resume
export const DELETE_RESUME = gql`
  mutation deleteResume($userId: String!) {
    deleteResume(userId: $userId) {
      _id
    }
  }
`;

// mutation to create subscription
//createSubscription(userId: String!, source: String!, plan: String!)
export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($userId: String!, $source: String!, $plan: String!) {
    createSubscription(userId: $userId, source: $source, plan: $plan) {
      email
      stripeId
      subscriptionType
    }
  }
`;

// query to fetch user subscription
export const FETCH_SUBSCRIPTION = gql`
  query getSubscription($userId: String!) {
    getSubscription(userId: $userId) {
      stripeId
      subscriptionType
      expirationDate
      nextPaymentDate
      nextPaymentAmount
      status
    }
  }
`;

// mutation to cancel subscription
export const CANCEL_SUBSCRIPTION = gql`
  mutation cancelSubscription($userId: String!) {
    cancelSubscription(userId: $userId) {
      email
      stripeId
      subscriptionType
    }
  }
`;