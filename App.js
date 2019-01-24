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

export default class App extends React.Component {
  state = {
    client: null,
  };

  async componentDidMount() {
    const client = await createClient();

    this.setState({ client });
  }

  render() {
    return (
      this.state.client && (
        <ApolloProvider client={this.state.client}>
          <SafeAreaView style={styles.safeArea}>
            <RootStack />
          </SafeAreaView>
        </ApolloProvider>
      )
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
