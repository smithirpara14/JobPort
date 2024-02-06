const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String
        creationDate: String!
        birthDate: String
        accountType: AccountType!
    }

    type AccountType {
        _id: ID!
        name: String!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        birthDate: String
        accountType: String!
    }

    type AuthData {
        userId: ID!
    }

    type RootQuery {
        users: [User!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);
