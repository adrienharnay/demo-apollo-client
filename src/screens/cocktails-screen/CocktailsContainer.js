import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import CocktailsList from './CocktailsList';

const GET_COCKTAILS = gql`
  query cocktails($ingredient: String) {
    cocktails(ingredient: $ingredient) {
      id
      name
      imageURL
    }
  }
`;

const CocktailsContainer = ({ ingredient }) => (
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

      return <CocktailsList cocktails={data.cocktails} />;
    }}
  </Query>
);

CocktailsContainer.propTypes = {
  ingredient: PropTypes.string,
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
