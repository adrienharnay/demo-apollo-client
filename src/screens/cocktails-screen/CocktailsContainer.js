import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import CocktailsList from './CocktailsList';

import getCocktails from './getCocktails.gql';
import getBookmarkedCocktails from './getBookmarkedCocktails.gql';
import getLikedCocktails from './getLikedCocktails.gql';

const FILTERS = {
  ALL: 'ALL',
  BOOKMARKED: 'BOOKMARKED',
  LIKED: 'LIKED',
};

const QUERIES_BY_FILTER = {
  [FILTERS.ALL]: getCocktails,
  [FILTERS.BOOKMARKED]: getBookmarkedCocktails,
  [FILTERS.LIKED]: getLikedCocktails,
};

const CocktailsContainer = ({ ingredient, filter, onRowPress }) => (
  <Query query={QUERIES_BY_FILTER[filter]} variables={{ ingredient }}>
    {({
      loading,
      error,
      data: {
        cocktails: allCocktails,
        bookmarkedCocktails,
        likedCocktails,
      } = {},
      refetch,
    }) => {
      const cocktails = allCocktails || bookmarkedCocktails || likedCocktails;

      if (loading && !cocktails) {
        return (
          <View style={styles.placeholderContainer}>
            <ActivityIndicator />
          </View>
        );
      }

      if (error) {
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.errorText}>Error :(</Text>
          </View>
        );
      }

      if (!cocktails.length) {
        if (filter === FILTERS.ALL) {
          if (!ingredient) {
            return (
              <View style={styles.placeholderContainer}>
                <Text style={styles.errorText}>
                  There is no cocktail (yet!)
                </Text>
              </View>
            );
          }

          return (
            <View style={styles.placeholderContainer}>
              <Text style={styles.errorText}>
                There is no cocktail made with this ingredient 🥒
              </Text>
            </View>
          );
        }

        if (filter === FILTERS.BOOKMARKED) {
          if (!ingredient) {
            return (
              <View style={styles.placeholderContainer}>
                <Text style={styles.errorText}>
                  You haven't bookmarked a cocktail (yet!) 🧐
                </Text>
              </View>
            );
          }

          return (
            <View style={styles.placeholderContainer}>
              <Text style={styles.errorText}>
                You haven't bookmarked a cocktail made with this ingredient
                (yet!) 🧐🍅
              </Text>
            </View>
          );
        }

        if (filter === FILTERS.LIKED) {
          if (!ingredient) {
            return (
              <View style={styles.placeholderContainer}>
                <Text style={styles.errorText}>
                  You haven't liked a cocktail (yet!) ⭐️
                </Text>
              </View>
            );
          }

          return (
            <View style={styles.placeholderContainer}>
              <Text style={styles.errorText}>
                You haven't liked a cocktail made with this ingredient (yet!)
                ⭐️🥕
              </Text>
            </View>
          );
        }
      }

      return (
        <CocktailsList
          cocktails={cocktails}
          onRowPress={onRowPress}
          refetch={refetch}
        />
      );
    }}
  </Query>
);

CocktailsContainer.propTypes = {
  ingredient: PropTypes.string,
  filter: PropTypes.string.isRequired,
  onRowPress: PropTypes.func.isRequired,
};

CocktailsContainer.defaultProps = {
  ingredient: '',
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    paddingHorizontal: '15%',
    textAlign: 'center',
  },
});

export default CocktailsContainer;
