import React from 'react';
import { ApolloProvider } from 'react-apollo';

import { createApolloClient } from './src/utils/ApolloUtils';

import RootStack from './RootStack';

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
          <RootStack />
        </ApolloProvider>
      )
    );
  }
}
