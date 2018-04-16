import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CocktailRow from './CocktailRow';

const GET_COCKTAILS = gql`
  query cocktails($ingredient: String) {
    cocktails(ingredient: $ingredient) {
      id
      name
      imageURL
    }
  }
`;

const CocktailsList = ({ ingredient }) => (
  <Query query={GET_COCKTAILS} variables={{ ingredient }}>
    {({ loading, error, data }) => {
      if (loading && !Object.keys(data).length) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Error :(</Text>
          </View>
        );
      }

      if (!data.cocktails.length) {
        return (
          <View style={styles.loadingContainer}>
            <Text>No results...</Text>
          </View>
        );
      }

      if (this.list) {
        this.list.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }

      return (
        <View style={styles.container}>
          <FlatList
            ref={r => {
              this.list = r;
            }}
            data={data.cocktails}
            keyExtractor={item => item.id}
            renderItem={CocktailRow}
          />
        </View>
      );
    }}
  </Query>
);

CocktailsList.propTypes = {
  ingredient: PropTypes.string,
};

CocktailsList.defaultProps = {
  ingredient: '',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default CocktailsList;
