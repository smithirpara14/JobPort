const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//graphql
const graphQlResolvers = require('./graphql/resolver/index');
const graphQLSchema = require('./graphql/schema/index');

//models
const User = require('./models/user');
const AccountType = require('./models/accounttype');

const app = express();

app.use(bodyParser.json());

app.use('/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    }));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
    }:${process.env.MONGO_PASSWORD
    }@cluster0.tnliqyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log('Server is running on port 3000');
    }).catch(err => {
        console.log(err);
    });