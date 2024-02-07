const express = require('express');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { readFileSync } = require('fs');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require("@apollo/server/express4");

//graphql
const typeDefs = readFileSync("./graphql/schema/schema.graphql", "utf8");
const graphQlResolvers = require('./graphql/resolver/index');

//models
const User = require('./models/user');
const AccountType = require('./models/accounttype');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const apolloServer = new ApolloServer({
    typeDefs,
    graphQlResolvers,
});

const startApolloServer = async () => {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
};

startApolloServer();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD
    }@cluster0.tnliqyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3001);
        console.log('Server is running on port 3001');
        console.log('GraphQl Server started on localhost:3001/graphql');
    }).catch(err => {
        console.log(err);
    });