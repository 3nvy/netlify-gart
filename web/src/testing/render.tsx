import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { render as rtlRender } from "@testing-library/react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { typeDefs } from "../../../api/graphql/schema";

export const render = (
    component: ReactElement,
    { mocks, mockTypes = {}, hasRouter = true } = { mocks: {}, mockTypes: {}, hasRouter: Boolean }
) => {
    const mockSchema = addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs }),
        mocks: mockTypes,
        resolvers: () => mocks,
    });

    const client = new ApolloClient({
        link: new SchemaLink({ schema: mockSchema }),
        cache: new InMemoryCache(),
    });

    if (hasRouter)
        return rtlRender(
            <ApolloProvider client={client}>
                <Router>{component}</Router>
            </ApolloProvider>
        );

    return rtlRender(<ApolloProvider client={client}>{component}</ApolloProvider>);
};
