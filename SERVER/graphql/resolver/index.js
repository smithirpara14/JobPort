import { users, login, createUser, updateUserPersonalInfo, user, accountTypes, accountType, deleteUser, createAccountType, deleteAccountType, updateAccountType  } from './auth.js';
import { GraphQlDateResolver } from './helper.js';
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
    updateUserPersonalInfo,
    createAccountType,
    deleteAccountType,
    updateAccountType 
  },
  GraphQlDate: GraphQlDateResolver
  
};