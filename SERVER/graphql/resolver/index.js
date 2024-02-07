import { users, login, createUser } from './auth.js';

export const resolvers = {
  Query: {
    users,
    login
  },
  Mutation: {
    createUser
  }
};