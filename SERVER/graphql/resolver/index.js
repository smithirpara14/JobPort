import { users, login, createUser, updateUserPersonalInfo, user, accountTypes, accountType, deleteUser, createAccountType, deleteAccountType, updateAccountType } from './auth.js';
import { jobPosts, allJobPosts, jobPost, createJobPost, updateJobPost, deleteJobPost, saveJob, savedJobsByEmail, removeSavedJob } from './job.js';
import { createApplication, applicationsByUser, applicationsByJob, application, updateApplicationStatus, deleteApplication } from './application.js';
import { recruiterSummary } from './recruiter.js';
import { GraphQlDateResolver } from './helper.js';

export const resolvers = {
  Query: {
    users,
    login,
    user,
    accountTypes,
    accountType,
    jobPosts,
    allJobPosts,
    jobPost,
    applicationsByUser,
    applicationsByJob,
    application,
    savedJobsByEmail,
    recruiterSummary
  },
  Mutation: {
    createUser,
    deleteUser,
    updateUserPersonalInfo,
    createAccountType,
    deleteAccountType,
    updateAccountType,
    createJobPost,
    updateJobPost,
    deleteJobPost,
    createApplication,
    updateApplicationStatus,
    deleteApplication,
    saveJob,
    removeSavedJob
  },
  GraphQlDate: GraphQlDateResolver

};