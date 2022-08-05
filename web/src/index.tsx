import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/authContext";
import App from "./components/App/App";

import "./index.css";

const httpLink = createHttpLink({
    uri: "/.netlify/functions/graphql",
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem("gotrue.user") || "{}")?.token?.access_token;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>
);
