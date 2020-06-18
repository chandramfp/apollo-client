import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ls from 'local-storage';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

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
  link: setAuthorizationLink.concat(httpLink),
  cache,
});

export default client;
