import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const GRAPHQL_PORT = 8080;

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  httpLink
);

const client = new ApolloClient({
  link, cache: new InMemoryCache(), connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);