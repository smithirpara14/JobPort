export const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        creationDate: String
        birthDate: String
        accountType: AccountType
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
        userId: String!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        users: [User!]!
        user(userId: ID!): User
        accountTypes: [AccountType!]!
        accountType(accountTypeId: ID!): AccountType
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createUser(userInput: UserInput): User
        deleteUser(userId: ID!): User        
        createAccountType(name: String!, description: String!): AccountType
        deleteAccountType(accountTypeId: ID!): AccountType
    }
`;
