import { users, login, createUser, user, accountTypes } from './auth.js';

export const resolvers = {
  Query: {
    users,
    login,
    user,
    accountTypes  
  },
  Mutation: {
    createUser
  }
};