import { ApolloServer } from "apollo-server-lambda";
import { Callback, Context, Handler } from "aws-lambda";
import { typeDefs, resolvers } from "../../graphql/schema";
import PrismaDB from "../../prisma/db";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ context }) => {
        return {
            db: PrismaDB, // Passing prisma client as context for easy access on resolvers,
            user: context?.clientContext?.user,
        };
    },
});

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    if (!event.requestContext) {
        event.requestContext = context;
    }
    return server.createHandler()(event, context, callback);
};
