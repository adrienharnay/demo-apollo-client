import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import getBookmarkedCocktails from '../cocktails-screen/getBookmarkedCocktails.gql';
import getLikedCocktails from '../cocktails-screen/getLikedCocktails.gql';
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

const handleShare = (imageURL, glassType, instructions, ingredients) => {
  const title = 'Check out this cool drink!';
  const message = `🥃 ${glassType}\n\n${instructions}\n\n${ingredients
    .map(({ name, quantity }) => `- ${quantity ? `${quantity} ` : ''}${name}`)
    .join('\n')}\n\nhttps://${imageURL}`;

  Share.share({ title, message }, { subject: title, dialogTitle: title });
};

const DetailsView = ({
  cocktail: {
    id,
    imageURL,
    likes,
    glassType,
    instructions,
    ingredients,
    liked,
    bookmarked,
  },
  listQuery,
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
          <Text style={styles.glassType}>{`🥃 ${glassType}`}</Text>
        </View>
        <View>
          <View style={styles.bookmarkAndLike}>
            <View style={styles.bookmark}>
              <Mutation
                mutation={toggleBookmarkCocktail}
                update={updateCocktailAfterBookmark}
                refetchQueries={[
                  {
                    query: getBookmarkedCocktails,
                    variables: listQuery,
                  },
                ]}
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
                refetchQueries={[
                  {
                    query: getLikedCocktails,
                    variables: listQuery,
                  },
                ]}
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
      <View style={styles.fourthSection}>
        <TouchableOpacity
          onPress={() =>
            handleShare(imageURL, glassType, instructions, ingredients)
          }
        >
          <Text style={styles.share}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

DetailsView.propTypes = {
  cocktail: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
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
  listQuery: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  fourthSection: {
    marginTop: 10,
  },
  share: {
    paddingVertical: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DetailsView;
