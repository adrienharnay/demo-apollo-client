import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({
    navigation: {
      state: {
        params: { name },
      },
    },
  }) => ({
    title: name,
  });

  render() {
    const {
      navigation: {
        state: {
          params: { id },
        },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>{id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
