import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaView, StyleSheet } from 'react-native';

import { createApolloClient } from './src/utils/ApolloUtils';
import { createNavigation } from './src/utils/NavigationUtils';

const RootStack = createNavigation();

export default class App extends React.Component {
  state = {
    client: null,
  };

  async componentDidMount() {
    const client = await createApolloClient();

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
