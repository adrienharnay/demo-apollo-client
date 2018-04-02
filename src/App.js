import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import Home from './screens/home/Home';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
