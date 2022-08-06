import { gql } from "apollo-server-lambda";
import { hasAuth, hasRole } from "../helpers/authHelpers";
import { GenericGraphQLResolver, GraphQLContext } from "../types/server";

export const ProfileTypeDefs = gql`
    type Query {
        profile: Profile!
        profiles: [Profile!]
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
        removeProfileFromRole(profileId: ID, roleName: String): Profile!
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
        profiles: (_parent: any, _args: any, { db, user }: GraphQLContext) => {
            hasAuth(user);
            hasRole(user, ["admin"]);

            return db.profile.findMany({
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
        removeProfileFromRole: async (_parent: any, { profileId, roleName }: any, { db, user }: GraphQLContext) => {
            hasAuth(user);

            return db.profile.update({
                where: {
                    id: profileId,
                },
                include: { roles: true },
                data: {
                    roles: {
                        disconnect: {
                            name: roleName,
                        },
                    },
                },
            });
        },
    },
};
