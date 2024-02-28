
export const typeDefs = `
    scalar GraphQlDate

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        creationDate: String
        birthDate: GraphQlDate
        accountType: AccountType
    }

    type AccountType {
        _id: ID!
        name: String!
        description: String!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        birthDate: GraphQlDate
        accountType: String!
    }

    type AuthData {
        userId: String!
        token: String!
        tokenExpiration: Int!
    }

    input UserPersonalInfo {
        firstName: String
        lastName: String
        birthDate: GraphQlDate
    }

    type Query {
        users: [User!]!
        user(email: String!): User
        accountTypes: [AccountType!]!
        accountType(accountTypeId: ID!): AccountType
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createUser(userInput: UserInput): User
        updateUserPersonalInfo(userPersonalInfo: UserPersonalInfo): User
        deleteUser(userId: ID!): User        
        createAccountType(name: String!, description: String!): AccountType
        deleteAccountType(accountTypeId: ID!): AccountType
        updateAccountType(accountTypeId: ID!, name: String!, description: String!): AccountType
    }
`;
