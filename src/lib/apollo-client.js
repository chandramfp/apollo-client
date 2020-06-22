import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ls from 'local-storage';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = ls.get('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: setAuthorizationLink.concat(link),
  cache,
});

export default client;
