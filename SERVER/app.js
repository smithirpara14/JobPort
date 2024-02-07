import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import { readFileSync } from 'fs';
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from './graphql/resolver/index.js';
import { isAuth } from './middleware/is-auth.js';
//graphql
// const typeDefs = readFileSync("./graphql/schema/schema.graphql", "utf8");
//const typeDefs = require("./graphql/schema/index");
//const graphQlResolvers = require('./graphql/resolver/index');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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