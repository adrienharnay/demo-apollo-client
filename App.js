import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import CocktailsScreen from './src/screens/cocktails-screen/CocktailsScreen';
import DetailsScreen from './src/screens/details-screen/DetailsScreen';

import { createClient } from './ApolloUtils';

const RootStack = createAppContainer(
  createStackNavigator(
    {
      Home: CocktailsScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#ffff',
        },
        headerBackTitle: null,
      },
    },
  ),
);

const App = () => (
  <ApolloProvider client={createClient()}>
    <SafeAreaView style={styles.safeArea}>
      <RootStack />
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
