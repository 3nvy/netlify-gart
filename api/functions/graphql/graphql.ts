import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-lambda";
import { Callback, Context, Handler } from "aws-lambda";
import { typeDefs, resolvers } from "../../graphql/schema";

const prisma = new PrismaClient();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: {
        db: prisma, // Passing prisma client as context for easy access on resolvers
    },
});

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    if (!event.requestContext) {
        event.requestContext = context;
    }
    return server.createHandler()(event, context, callback);
};
