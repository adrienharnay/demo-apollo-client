import debounce from 'lodash.debounce';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import CocktailsContainer from './CocktailsContainer';

export default class CocktailsScreen extends React.Component {
  state = {
    ingredient: '',
  };

  handleInputChange = debounce(ingredient => {
    this.setState({ ingredient });
  }, 400);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            onChangeText={this.handleInputChange}
            placeholder="Select ingredient..."
          />
        </View>
        <CocktailsContainer ingredient={this.state.ingredient} />
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
  inputView: {
    alignSelf: 'stretch',
    paddingHorizontal: '20%',
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#ddd',
    height: 40,
    width: '100%',
    textAlign: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
});
