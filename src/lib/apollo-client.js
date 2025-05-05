import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

// creating an http link
const httpLink = createPersistedQueryLink({ sha256 }).concat(
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition"
    );
  },
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const initialState = {
  token: "",
};

apolloClient.cache.modify({ data: initialState });

apolloClient.onResetStore(() =>
  apolloClient.cache.modify({ data: initialState })
);

export default apolloClient;
