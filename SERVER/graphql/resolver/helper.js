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

export const GraphQlUploadResolver = new GraphQLScalarType({
    name: "Upload",
    description: "A GraphQL Upload Type",
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        return ast.value;
    },
    serialize(value) {
        return value;
    },
});