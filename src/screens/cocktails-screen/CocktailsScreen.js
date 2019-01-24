import debounce from 'lodash.debounce';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CocktailsContainer from './CocktailsContainer';

const FILTERS = {
  ALL: 'ALL',
  BOOKMARKED: 'BOOKMARKED',
  LIKED: 'LIKED',
};

const EMOJIS_BY_FILTER = {
  [FILTERS.ALL]: '🃏',
  [FILTERS.BOOKMARKED]: '🧐',
  [FILTERS.LIKED]: '⭐️',
};

export default class CocktailsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    ingredient: '',
    filter: FILTERS.ALL,
  };

  handleInputChange = debounce(ingredient => {
    this.setState({ ingredient });
  }, 400);

  handleFilterChange = () => {
    const filtersValues = Object.values(FILTERS);

    this.setState(prevState => ({
      filter:
        filtersValues[
          (filtersValues.indexOf(prevState.filter) + 1) % filtersValues.length
        ],
    }));
  };

  onRowPress = params => {
    this.props.navigation.navigate('Details', {
      ...params,
      listQuery: { ingredient: this.state.ingredient },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inputView}>
            <TextInput
              autoCorrect={false}
              style={styles.input}
              onChangeText={this.handleInputChange}
              placeholder="Select an ingredient 🍋"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.handleFilterChange}
            style={styles.filterView}
          >
            <Text style={styles.filter}>
              {EMOJIS_BY_FILTER[this.state.filter]}
            </Text>
          </TouchableOpacity>
        </View>
        <CocktailsContainer
          ingredient={this.state.ingredient}
          filter={this.state.filter}
          onRowPress={this.onRowPress}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inputView: {
    flex: 1,
  },
  filterView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 3,
    paddingVertical: 2,
    marginLeft: 10,
  },
  filter: {
    fontSize: 30,
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
