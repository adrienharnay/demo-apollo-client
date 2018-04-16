import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage, SafeAreaView, StyleSheet } from 'react-native';

import CocktailsScreen from './screens/cocktails-screen/CocktailsScreen';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
});

const client = new ApolloClient({
  uri: 'https://demo-apollo-server.herokuapp.com/graphql',
  cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaView style={styles.safeArea}>
      <CocktailsScreen />
    </SafeAreaView>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;