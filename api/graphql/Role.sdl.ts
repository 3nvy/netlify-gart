import { gql } from "apollo-server-lambda";
import { GenericGraphQLResolver, GraphQLContext } from "../types/server";

export const RoleTypeDef = gql`
    type Query {
        roles: [Role]
    }

    type Role {
        id: ID!
        name: String!
        profiles: [Profile!]
    }
`;

export const RoleResolvers: GenericGraphQLResolver = {
    Query: {
        roles: (_parent: any, _args: any, { db, user }: GraphQLContext) =>
            db.role.findMany({
                include: { profiles: true },
            }),
    },
};
