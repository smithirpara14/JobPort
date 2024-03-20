import { users, login, createUser, updateUserPersonalInfo, user, accountTypes, accountType, deleteUser, createAccountType, deleteAccountType, updateAccountType } from './auth.js';
import { jobPosts, allJobPosts, jobPost, createJobPost, updateJobPost, deleteJobPost } from './job.js';
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
    jobPost
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
    deleteJobPost
  },
  GraphQlDate: GraphQlDateResolver

};