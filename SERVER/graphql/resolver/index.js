import { users, login, createUser, updateUserPersonalInfo, user, accountTypes, accountType, deleteUser, createAccountType, deleteAccountType, updateAccountType, createSubscription, getSubscription, cancelSubscription } from './auth.js';
import { jobPosts, allJobPosts, jobPost, jobPostWithApplication, jobPostWithApplications, createJobPost, updateJobPost, deleteJobPost, saveJob, savedJobsByEmail, removeSavedJob, savedAppliedJobsByUser } from './job.js';
import { createApplication, applicationsByUser, applicationsByJob, application, updateApplicationStatus, deleteApplication } from './application.js';
import { recruiterSummary } from './recruiter.js';
import { uploadResume, getResume } from './resume.js';
import { GraphQlDateResolver, GraphQlUploadResolver } from './helper.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import Stripe from 'stripe';
export const resolvers = {
  GraphQlDate: GraphQlDateResolver,
  Upload: GraphQLUpload,
  Query: {
    users,
    login,
    user,
    accountTypes,
    accountType,
    jobPosts,
    allJobPosts,
    jobPost,
    jobPostWithApplication,
    jobPostWithApplications,
    applicationsByUser,
    applicationsByJob,
    application,
    savedJobsByEmail,
    recruiterSummary,
    savedAppliedJobsByUser,
    getResume,
    getSubscription
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
    removeSavedJob,
    uploadResume,
    createSubscription,
    cancelSubscription
  }
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)