import { gql } from "apollo-server-lambda";
import { hasAuth } from "../helpers/authHelpers";
import { GenericGraphQLResolver, GraphQLContext } from "../types/server";

export const ProfileTypeDefs = gql`
    type Query {
        profile: Profile!
    }

    type Profile {
        id: ID!
        email: String!
        userName: String!
        firstName: String
        surName: String
        occupation: String
        age: Int
        roles: [Role!]
    }

    type Mutation {
        updateProfile(input: UpdateProfileInput): Profile!
    }

    input UpdateProfileInput {
        firstName: String
        surName: String
        occupation: String
        age: Int
    }
`;

export const ProfileResolvers: GenericGraphQLResolver = {
    Query: {
        profile: (_parent: any, _args: any, { db, user }: GraphQLContext) => {
            hasAuth(user);
            return db.profile.findUnique({
                where: { id: user?.sub },
                include: { roles: true },
            });
        },
    },
    Mutation: {
        updateProfile: async (_parent: any, { input }: any, { db, user }: GraphQLContext) => {
            hasAuth(user);
            return db.profile.update({
                where: {
                    id: user?.sub,
                },
                data: input,
            });
        },
    },
};
