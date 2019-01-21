import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import getCocktail from './getCocktail.gql';
import toggleBookmarkCocktail from './toggleBookmarkCocktail.gql';
import toggleLikeCocktail from './toggleLikeCocktail.gql';

const updateCocktailAfterBookmark = (
  cache,
  { data: { toggleBookmarkCocktail } },
) => {
  const data = cache.readQuery({
    query: getCocktail,
    variables: { id: toggleBookmarkCocktail.id },
  });
  const newData = {
    ...data,
    ...toggleBookmarkCocktail,
  };

  cache.writeQuery({
    query: getCocktail,
    variables: { id: toggleBookmarkCocktail.id },
    data: newData,
  });
};

const updateCocktailAfterLike = (cache, { data: { toggleLikeCocktail } }) => {
  const data = cache.readQuery({
    query: getCocktail,
    variables: { id: toggleLikeCocktail.id },
  });
  const newData = {
    ...data,
    ...toggleLikeCocktail,
  };

  cache.writeQuery({
    query: getCocktail,
    variables: { id: toggleLikeCocktail.id },
    data: newData,
  });
};

const DetailsView = ({
  cocktail: {
    id,
    likes,
    glassType,
    instructions,
    ingredients,
    liked,
    bookmarked,
  },
}) => {
  const IngredientsList = ingredients.map(({ name, quantity }, index) => (
    <Text key={index}>
      <Text>{'- '}</Text>
      {quantity && <Text style={styles.bold}>{`${quantity} `}</Text>}
      <Text>{name}</Text>
    </Text>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <View>
          <Text style={styles.glassType}>{glassType}</Text>
        </View>
        <View>
          <View style={styles.bookmarkAndLike}>
            <View style={styles.bookmark}>
              <Mutation
                mutation={toggleBookmarkCocktail}
                update={updateCocktailAfterBookmark}
              >
                {toggleBookmark => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      toggleBookmark({
                        variables: { id },
                        optimisticResponse: {
                          __typename: 'Mutation',
                          toggleBookmarkCocktail: {
                            __typename: 'Cocktail',
                            id,
                            bookmarked: !bookmarked,
                          },
                        },
                      })
                    }
                  >
                    <Text
                      style={{
                        opacity: bookmarked ? 1 : 0.3,
                        padding: 10,
                      }}
                    >
                      {'🧐'}
                    </Text>
                  </TouchableOpacity>
                )}
              </Mutation>
            </View>
            <View>
              <Mutation
                mutation={toggleLikeCocktail}
                update={updateCocktailAfterLike}
              >
                {toggleLike => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      toggleLike({
                        variables: { id },
                        optimisticResponse: {
                          __typename: 'Mutation',
                          toggleLikeCocktail: {
                            __typename: 'Cocktail',
                            id,
                            likes: liked ? likes - 1 : likes + 1,
                            liked: !liked,
                          },
                        },
                      })
                    }
                    style={{ width: 60 }}
                  >
                    <View
                      style={{
                        opacity: liked ? 1 : 0.3,
                        padding: 10,
                        width: 55,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text>{likes}</Text>
                      <Text>{'⭐️'}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </Mutation>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text>{instructions}</Text>
      </View>
      <View style={styles.thirdSection}>{IngredientsList}</View>
    </View>
  );
};

DetailsView.propTypes = {
  cocktail: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    glassType: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.string,
      }),
    ).isRequired,
    liked: PropTypes.bool.isRequired,
    bookmarked: PropTypes.bool.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  glassType: {
    paddingVertical: 10,
  },
  bookmarkAndLike: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookmark: {
    marginRight: 15,
  },
  secondSection: {
    marginTop: 20,
    marginLeft: 10,
  },
  thirdSection: {
    marginTop: 20,
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DetailsView;
