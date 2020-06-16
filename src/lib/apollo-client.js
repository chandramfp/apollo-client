import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
