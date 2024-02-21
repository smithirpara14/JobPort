import { users, login, createUser, user, accountTypes, accountType, deleteUser, createAccountType, deleteAccountType, updateAccountType  } from './auth.js';

export const resolvers = {
  Query: {
    users,
    login,
    user,
    accountTypes,
    accountType
  },
  Mutation: {
    createUser,
    deleteUser,
    createAccountType,
    deleteAccountType,
    updateAccountType 
  }
};