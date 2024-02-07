const { GraphQLScalarType } = require("graphql");

const GraphQlDateResolver = new GraphQLScalarType({
    name: "GraphQlDate",
    description: "A GraphQl Date Type",
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const newDate = new Date(value);
        return isNaN(newDate) ? undefined : newDate;
    },
});

module.exports = {
    GraphQlDateResolver
};

