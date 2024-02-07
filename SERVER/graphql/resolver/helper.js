import { GraphQLScalarType } from "graphql";

export const GraphQlDateResolver = new GraphQLScalarType({
    name: "GraphQlDate",
    description: "A GraphQL Date Type",
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const newDate = new Date(value);
        return isNaN(newDate) ? undefined : newDate;
    },
});
