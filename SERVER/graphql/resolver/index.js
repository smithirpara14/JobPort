const authResolver = require('./auth');
const helperResolver = require('./helper');

const rootResolver = {
    ...authResolver,
    ...helperResolver
};

module.exports = rootResolver;