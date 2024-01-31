const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type AccountType{
        _id : ID!
        name: String!
    }

    type User{
        _id : ID!
        email: String!
        password: String
        accountType: AccountType!
    }

    input UserInput{
        email: String!
        password: String!
        accountType: String!
    }

    type AuthData{
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
