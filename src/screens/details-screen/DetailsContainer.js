import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import DetailsView from './DetailsView';

import getCocktail from './getCocktail.gql';

const DetailsContainer = ({ id, imageURL, listQuery }) => (
  <Query query={getCocktail} variables={{ id }}>
    {({ loading, error, data: { cocktail } = {} }) => {
      if (loading && !cocktail) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.loadingContainer}>
            <Text>An error occured 😔</Text>
          </View>
        );
      }

      return (
        <DetailsView
          cocktail={{ ...cocktail, imageURL }}
          listQuery={listQuery}
        />
      );
    }}
  </Query>
);

DetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  listQuery: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsContainer;
