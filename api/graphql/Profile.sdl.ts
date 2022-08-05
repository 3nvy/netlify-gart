import { gql } from "apollo-server-lambda";
import { GenericGraphQLResolver, GraphQLContext } from "../types/server";

export const ProfileTypeDefs = gql`
    type Query {
        profile(id: ID): Profile!
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
        profile: (_parent: any, { id }: any, { db, user }: GraphQLContext) =>
            db.profile.findUnique({
                where: { id },
                include: { roles: true },
            }),
    },
    Mutation: {
        updateProfile: (_parent: any, { input }: any, { db, user }: GraphQLContext) => {
            return {};
        },
    },
};
