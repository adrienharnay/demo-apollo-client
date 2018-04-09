import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import CocktailsList from './screens/cocktails-list/CocktailsList';

const client = new ApolloClient({
  uri: 'https://demo-apollo-server.herokuapp.com/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <CocktailsList />
  </ApolloProvider>
);

export default App;
