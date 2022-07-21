import { gql } from "apollo-server-lambda";
import { GenericGraphQLResolver, PrismaDB } from "../types/server";

export const UserExampleTypeDefs = gql`
    type Query {
        users: [User!]
        user(id: ID!): User!
    }

    type User {
        id: ID!
        firstName: String!
        surName: String!
        age: Int!
        occupation: String!
    }

    type Mutation {
        createUser(input: CreateUser!): User
    }

    input CreateUser {
        firstName: String!
        surName: String!
        age: Int!
        occupation: String!
    }
`;

export const UserExampleResolvers: GenericGraphQLResolver = {
    Query: {
        users: (_parent: any, _args: any, { db }: { db: PrismaDB }) => {
            console.log(db);
            return db.userExample.findMany();
        },
        user: (_parent: any, { id }: any, { db }: { db: PrismaDB }) =>
            db.userExample.findUnique({
                where: {
                    id,
                },
            }),
    },

    Mutation: {
        createUser: (_parent: any, { input }: any, { db }: { db: PrismaDB }) =>
            db.userExample.create({
                data: input,
            }),
    },
};
