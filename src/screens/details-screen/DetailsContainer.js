import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import DetailsView from './DetailsView';

const GET_COCKTAIL = gql`
  query cocktail($id: ID!) {
    cocktail(id: $id) {
      likes
      glassType
      instructions
      ingredients {
        name
        quantity
      }
    }
  }
`;

const DetailsContainer = ({ id }) => (
  <Query query={GET_COCKTAIL} variables={{ id }}>
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
            <Text>Error :(</Text>
          </View>
        );
      }

      return <DetailsView cocktail={cocktail} />;
    }}
  </Query>
);

DetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
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
