import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import CocktailsList from './CocktailsList';

import getCocktails from './getCocktails.gql';

const CocktailsContainer = ({ ingredient, onRowPress }) => (
  <Query query={getCocktails} variables={{ ingredient }}>
    {({ loading, error, data: { cocktails } = {} }) => {
      if (loading && !cocktails) {
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

      if (!cocktails.length) {
        return (
          <View style={styles.loadingContainer}>
            <Text>No results...</Text>
          </View>
        );
      }

      return <CocktailsList cocktails={cocktails} onRowPress={onRowPress} />;
    }}
  </Query>
);

CocktailsContainer.propTypes = {
  ingredient: PropTypes.string,
  onRowPress: PropTypes.func.isRequired,
};

CocktailsContainer.defaultProps = {
  ingredient: '',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CocktailsContainer;
