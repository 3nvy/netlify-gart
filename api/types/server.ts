import { PrismaClient, Prisma } from "@prisma/client";

export type PrismaDB = PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export type GenericGraphQLResolver = {
    [index: string]: {};
    Query: {};
};

export type GraphQLContext = {
    db: PrismaDB;
    user?: {};
};
